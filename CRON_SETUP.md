# Cron Job Configuration for Supabase Keep-Alive

## Purpose
Prevents Supabase free tier from pausing due to inactivity by pinging the database every hour.

## Setup Options

### Option 1: cron-job.org (Recommended - Free)

1. Go to [cron-job.org](https://cron-job.org)
2. Create free account
3. Create new cron job:
   - **URL**: `https://your-app.ondigitalocean.app/api/cron`
   - **Schedule**: Every 1 hour
   - **Title**: "Supabase Keep-Alive"
   - **Enabled**: Yes

### Option 2: UptimeRobot (Alternative - Free)

1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Create free account
3. Add new monitor:
   - **Type**: HTTP(s)
   - **URL**: `https://your-app.ondigitalocean.app/api/cron`
   - **Interval**: 50 minutes (max for free tier)
   - **Alert Contacts**: Optional

### Option 3: EasyCron (Alternative - Free)

1. Go to [easycron.com](https://www.easycron.com)
2. Create free account
3. Create cron job:
   - **URL**: `https://your-app.ondigitalocean.app/api/cron`
   - **Cron Expression**: `0 * * * *` (every hour)

## Testing

Test the endpoint manually:
```bash
curl https://your-app.ondigitalocean.app/api/cron
```

Expected response:
```json
{
  "success": true,
  "message": "Supabase ping successful",
  "timestamp": "2024-XX-XXTXX:XX:XX.XXXZ"
}
```

## Notes

- Supabase free tier pauses after 7 days of inactivity
- This cron job keeps the database active
- No configuration needed in Digital Ocean
- Completely free solution
