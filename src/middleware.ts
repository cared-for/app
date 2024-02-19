import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log("does it not get in here?")
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
  
  // PLAUSIBLE API EVENT REQUEST STUFF
  // const userAgentData = userAgent(request)
  // const requestedHost = request.headers.get('X-Forwarded-Host');
  // const requestedPort = request.headers.get('X-Forwarded-Port');
  // const requestedProto = request.headers.get('X-Forwarded-Proto');
  //
  // const all = Array.from(request.headers.entries())
  // console.log("all :", all)
  //
  // console.log("user agent: ", userAgentData)
  // console.log("requested host: ", requestedHost)
  // console.log("requested port: ", requestedPort)
  // console.log("requested proto: ", requestedProto)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
