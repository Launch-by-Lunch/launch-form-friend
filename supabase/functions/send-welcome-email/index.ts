
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  submissionData: {
    company_name: string;
    founder_name: string;
    email: string;
    industry?: string;
    project_description?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { submissionData }: WelcomeEmailRequest = await req.json();
    
    console.log("Sending welcome email for submission:", submissionData.company_name);

    const emailResponse = await resend.emails.send({
      from: "Launch by Lunch <onboarding@resend.dev>",
      to: ["welcome@launchbylunch.co"],
      subject: `New Startup Application: ${submissionData.company_name}`,
      html: `
        <h1>New Startup Application Received!</h1>
        <p>A new startup has submitted their application through the intake form.</p>
        
        <h2>Company Details:</h2>
        <ul>
          <li><strong>Company Name:</strong> ${submissionData.company_name}</li>
          <li><strong>Founder:</strong> ${submissionData.founder_name}</li>
          <li><strong>Email:</strong> ${submissionData.email}</li>
          ${submissionData.industry ? `<li><strong>Industry:</strong> ${submissionData.industry}</li>` : ''}
        </ul>
        
        ${submissionData.project_description ? `
          <h2>Project Description:</h2>
          <p>${submissionData.project_description}</p>
        ` : ''}
        
        <p>Please review the full submission in your dashboard and follow up accordingly.</p>
        
        <p>Best regards,<br>Launch by Lunch System</p>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailId: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
