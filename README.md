# Immortal Cyber Team Website

Next.js website for Immortal Cyber Teams.

## Design system

Follow [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for the project color, effects, and interaction rules.

## Ghost hero video

`components/ghost-hero-video.tsx` maps the desktop cursor position to the paused hero video. The prepared MP4 uses the 4.75–8.25 second turn from `kling_20261117_VIDEO_At_the_sta_2329_0.mp4`, with every frame encoded as a keyframe for responsive seeking. The neutral pose is 1.5 seconds into this clip. There is no audio or autoplay. Touch devices, reduced-motion preferences, and video load failures use the matching full-resolution poster.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```
