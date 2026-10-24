import type { APIRoute, GetStaticPaths } from 'astro'
import { guitarPresets, thronesIntro, type GuitarPreset } from '@/lib/guitar-presets'

// Scores are static assets, fetched only for the riff being played.
export const getStaticPaths: GetStaticPaths = () => [...guitarPresets, thronesIntro].map(preset => ({params:{id:preset.id},props:{preset}}))
export const GET: APIRoute = ({props}) => new Response(JSON.stringify(props.preset as GuitarPreset), {headers:{'Content-Type':'application/json','Cache-Control':'public, max-age=86400'}})
