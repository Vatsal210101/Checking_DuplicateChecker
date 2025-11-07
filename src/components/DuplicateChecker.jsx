import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'

function preprocess(s){
  if(!s) return ''
  return String(s).toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g,' ').trim()
}

function commonWords(q1,q2){
  const w1 = new Set(preprocess(q1).split(' ').filter(Boolean))
  const w2 = new Set(preprocess(q2).split(' ').filter(Boolean))
  let common = 0
  w1.forEach(w => { if(w2.has(w)) common++ })
  return common
}

function totalWords(q1,q2){
  const w1 = new Set(preprocess(q1).split(' ').filter(Boolean))
  const w2 = new Set(preprocess(q2).split(' ').filter(Boolean))
  return w1.size + w2.size
}

function lcsLen(a, b){
  a = String(a); b = String(b)
  const m = a.length, n = b.length
  if(m === 0 || n === 0) return 0
  let dp = new Array(n+1).fill(0)
  let best = 0
  for(let i=1;i<=m;i++){
    let prev = 0
    for(let j=1;j<=n;j++){
      const tmp = dp[j]
      if(a[i-1] === b[j-1]){
        dp[j] = prev + 1
        if(dp[j] > best) best = dp[j]
      } else {
        dp[j] = 0
      }
      prev = tmp
    }
  }
  return best
}

export default function DuplicateChecker(){
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('')
  const [result, setResult] = useState(null)

  function compute(){
    const p1 = preprocess(q1)
    const p2 = preprocess(q2)
    const cw = commonWords(p1,p2)
    const tw = totalWords(p1,p2)
    const cw_ratio = tw ? +(cw / tw).toFixed(2) : 0
    const last_word_eq = (p1.split(' ').filter(Boolean).slice(-1)[0] || '') === (p2.split(' ').filter(Boolean).slice(-1)[0] || '') ? 1 : 0
    const first_word_eq = (p1.split(' ').filter(Boolean)[0] || '') === (p2.split(' ').filter(Boolean)[0] || '') ? 1 : 0
    const lcs = lcsLen(p1, p2)
    const longest_substr_ratio = Math.min(p1.length, p2.length) ? +(lcs / Math.min(p1.length, p2.length)).toFixed(2) : 0

    // simple heuristic score: weighted combination (tweakable)
    const score = (
      (cw_ratio * 0.5) +
      (longest_substr_ratio * 0.35) +
      (last_word_eq * 0.05) +
      (first_word_eq * 0.05)
    )

    setResult({ is_duplicate: score >= 0.35 })
  }

  function onClear(){
    setQ1('')
    setQ2('')
    setResult(null)
  }

  return (
  <Paper elevation={6} sx={{ p:3, maxWidth:900, mx:'auto', transition: 'box-shadow 200ms', ':hover': { boxShadow: '0 18px 60px rgba(2,6,23,0.12)' } }}>
      <Stack spacing={2}>
        <Typography variant="h5">Duplicate Question Pair Checker</Typography>

        <TextField
          label="Question 1"
          placeholder="Enter the first question"
          multiline
          minRows={2}
          value={q1}
          onChange={e=>setQ1(e.target.value)}
          fullWidth
        />

        <TextField
          label="Question 2"
          placeholder="Enter the second question"
          multiline
          minRows={2}
          value={q2}
          onChange={e=>setQ2(e.target.value)}
          fullWidth
        />

        <Stack direction="row" spacing={2} justifyContent="flex-start">
          <Button variant="contained" color="primary" onClick={compute}>Check Duplicate</Button>
          <Button variant="outlined" color="inherit" onClick={onClear}>Clear</Button>
          <Button variant="text" onClick={()=>{ setQ1('Where is the capital of India?'); setQ2('Which city serves as the capital of India?') }}>Example 1</Button>
          <Button variant="text" onClick={()=>{ setQ1('How do I learn Python quickly?'); setQ2('What is the fastest way to learn Python?') }}>Example 2</Button>
        </Stack>

        <Divider sx={{ my:1 }} />

        <Box>
          {result ? (
            result.is_duplicate ? (
              <Chip icon={<CheckCircleIcon />} label="Duplicate" color="success" sx={{ fontWeight:700, fontSize:16, py:1 }} />
            ) : (
              <Chip icon={<CancelIcon />} label="Not Duplicate" color="error" sx={{ fontWeight:700, fontSize:16, py:1 }} />
            )
          ) : (
            <Typography color="text.secondary">Enter two questions and click &quot;Check Duplicate&quot; to see the result.</Typography>
          )}
        </Box>
      </Stack>
    </Paper>
  )
}
