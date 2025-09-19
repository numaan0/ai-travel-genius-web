import { useState, useRef, useEffect } from 'react';
import {
  Paper, IconButton, TextField, Box,
  Typography, Fade
} from '@mui/material';
import ChatIcon  from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon  from '@mui/icons-material/Send';
import { adkService } from '@/lib/adk-service';

export default function ChatbotPopover() {
  const [open, setOpen]   = useState(false);
  const [msg,  setMsg]    = useState('');
  const [log,  setLog]    = useState<string[]>([]);
  const endRef            = useRef<HTMLDivElement | null>(null);

  /* auto-scroll */
  const scrollToBottom = () =>
    endRef.current?.scrollIntoView({ behavior:'smooth' });

  useEffect(scrollToBottom, [log, open]);

  /* talk to root agent */
const send = async () => {
  if (!msg.trim()) return;

  // log user line
  setLog(l => [...l, `🧑‍💻 ${msg}`]);

  try {
    // 1️⃣ call root agent
    const res = await adkService.askQuestion(msg);

    // 2️⃣ extract the JSON object we embed in parts[0].text
    const obj = adkService.parseAdkJson(res);

    // 3️⃣ decide what to show
    if (obj?.answer) {
      setLog(l => [...l, `🤖 ${obj.answer}`]);      // chat-style payload
    } else if (obj?.dailyPlans) {
      // setItinerary(obj);                            // full itinerary payload
      setLog(l => [...l, '🤖 Itinerary updated!']);
    } else {
      // fallback – join all text parts just in case
      const parts   = res?.[0]?.content?.parts ?? [];
      const aiReply = parts.map((p: any) => p.text).join('\n') || 'No response';
      setLog(l => [...l, `🤖 ${aiReply}`]);
    }
  } catch (e: any) {
    setLog(l => [...l, `🚨 ${e.message || 'Error talking to agent'}`]);
  }

  setMsg('');
};

  return (
    <Fade in>
      <Box sx={{ position:'fixed', right:24, bottom:24, zIndex:1300 }}>
        {/* launcher */}
        {!open && (
          <IconButton size="large" color="primary" onClick={()=>setOpen(true)}>
            <ChatIcon fontSize="large"/>
          </IconButton>
        )}

        {/* chat window */}
        {open && (
          <Paper elevation={6}
            sx={{ p:2, width:360, height:460,
                  display:'flex', flexDirection:'column' }}>
            {/* header */}
            <Box sx={{ display:'flex', justifyContent:'space-between', mb:1 }}>
              <Typography variant="h6">Travel Genius</Typography>
              <IconButton onClick={()=>setOpen(false)} size="small">
                <CloseIcon/>
              </IconButton>
            </Box>

            {/* log */}
            <Box sx={{ flex:1, overflowY:'auto', mb:1, px:1 }}>
              {log.map((line,i)=>
                <Typography key={i} sx={{ whiteSpace:'pre-wrap', mb:1 }}>
                  {line}
                </Typography>
              )}
              <div ref={endRef}/>
            </Box>

            {/* input row */}
            <Box sx={{ display:'flex', gap:1 }}>
              <TextField
                placeholder="Ask Travel Genius…"
                fullWidth size="small"
                value={msg}
                onChange={e=>setMsg(e.target.value)}
                onKeyDown={e=>e.key==='Enter' && send()}
              />
              <IconButton onClick={send}><SendIcon/></IconButton>
            </Box>
          </Paper>
        )}
      </Box>
    </Fade>
  );
}
