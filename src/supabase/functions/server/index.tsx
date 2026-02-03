// This edge function is disabled
// The application works exclusively with localStorage
// No server-side functionality is required

export default function handler() {
  return new Response(
    JSON.stringify({ 
      message: "This edge function is disabled. The application uses localStorage only.",
      status: "disabled" 
    }),
    { 
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
}
