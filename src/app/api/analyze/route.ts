import { OpenAI } from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userData, repoData, langStats } = await req.json();

        // 🛡️ Guard against missing data
        if (!userData || !repoData || !langStats) {
            return NextResponse.json({ error: "Missing required profile data" }, { status: 400 });
        }

        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey || apiKey === "your_api_key_here") {
            const topLangs = langStats.slice(0, 2).map((l: any) => l.language);
            const repoCount = repoData.length;
            const totalStars = repoData.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0);

            // Intelligence Logic for Archetypes
            let archetype = "Universal Builder";
            if (topLangs.includes("TypeScript") || topLangs.includes("JavaScript")) {
                archetype = topLangs.includes("React") ? "Interface Architect" : "Logical Engine Specialist";
            }
            if (topLangs.includes("Python")) archetype = "Neural Operations Engineer";
            if (topLangs.includes("Rust") || topLangs.includes("Go")) archetype = "Systems Core Designer";
            if (topLangs.length >= 2) archetype = `Polyglot ${archetype}`;

            // Intelligence Logic for Summary
            const summary = `Your digital signature reveals a high-velocity output in ${topLangs.join(" & ") || "software modules"}. With ${repoCount} nodes synchronized and ${totalStars} resonance points (stars), you exhibit a ${totalStars > 10 ? "high-impact" : "consistent"} contribution pattern typical of a seasoned ${archetype}.`;

            // Dynamic Strengths
            const strengths = [
                `Advanced mastery of ${topLangs[0] || "modern stacks"}`,
                repoCount > 20 ? "High-scale repository management" : "Focused architectural density",
                totalStars > 5 ? "Community-validated project impact" : "Methodical module maintenance"
            ];

            return NextResponse.json({
                summary,
                archetype,
                strengths,
                suggestions: [
                    "Scale architectural documentation for deep-trace readability",
                    "Optimize module decoupling in primary tech silos",
                    "Expand high-resonance projects through open-source linkage"
                ]
            });
        }

        // Initialize OpenAI only if we have a key
        const openai = new OpenAI({ apiKey });

        const prompt = `
      Analyze this GitHub developer profile and provide a professional executive summary.
      User: ${userData.login}
      Bio: ${userData.bio || "No bio"}
      Top Languages: ${langStats.slice(0, 3).map((s: any) => s.language).join(", ")}
      Project Count: ${repoData.length}
      
      Return a JSON object with:
      - summary: A 2-3 sentence technical executive summary.
      - archetype: A creative professional developer title (e.g., "React Architecture Specialist").
      - strengths: An array of 3 technical strengths.
      - suggestions: An array of 2-3 career/technical improvement suggestions.
    `;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        return NextResponse.json(JSON.parse(response.choices[0].message.content || "{}"));
    } catch (error: any) {
        console.error("AI Analysis Error:", error);
        return NextResponse.json({
            error: "Failed to generate AI analysis",
            details: error.message
        }, { status: 500 });
    }
}
