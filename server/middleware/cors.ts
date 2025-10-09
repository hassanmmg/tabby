export default defineEventHandler((event) => {
  // Add CORS headers to all responses
  const origin = getHeader(event, 'origin') || '*'
  
  setHeader(event, 'Access-Control-Allow-Origin', origin)
  setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization')
  setHeader(event, 'Access-Control-Allow-Credentials', 'true')
  
  // Handle preflight requests
  if (getMethod(event) === 'OPTIONS') {
    event.node.res.statusCode = 204
    event.node.res.statusMessage = 'No Content'
    return event.node.res.end()
  }
})