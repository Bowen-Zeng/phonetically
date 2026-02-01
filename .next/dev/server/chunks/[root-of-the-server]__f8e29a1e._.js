module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/OneDrive/Documents/phonetically/lib/mongodb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDb",
    ()=>getDb
]);
/**
 * MongoDB connection - uses MONGODB_URI env variable
 * Add to .env.local: MONGODB_URI=mongodb+srv://...
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$mongodb$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs, [project]/OneDrive/Documents/phonetically/node_modules/mongodb)");
;
const uri = process.env.MONGODB_URI;
if (!uri) {
    console.warn('MONGODB_URI not set - therapist dashboard will not persist');
}
let client = null;
async function getDb() {
    if (!uri) throw new Error('MONGODB_URI not configured');
    if (!client) client = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$mongodb$29$__["MongoClient"](uri);
    await client.connect();
    return client.db();
}
}),
"[project]/OneDrive/Documents/phonetically/app/api/dashboard/summary/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
/**
 * GET /api/dashboard/summary?userId=...
 * Returns lastSession, recentAttempts, recommendedSound for dashboard
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/lib/mongodb.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const uid = searchParams.get('userId') || 'default';
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        const lastSession = await db.collection('sessions').findOne({
            userId: uid
        }, {
            sort: {
                startedAt: -1
            }
        });
        const recentAttempts = await db.collection('attempts').find({
            userId: uid
        }).sort({
            createdAt: -1
        }).limit(20).project({
            word: 1,
            sound: 1,
            transcript: 1,
            accuracy: 1,
            needsCorrection: 1,
            createdAt: 1
        }).toArray();
        let recommendedSound = null;
        const attemptsWithSound = recentAttempts.filter((a)=>a.sound);
        if (attemptsWithSound.length > 0) {
            const bySound = {};
            for (const a of attemptsWithSound){
                const s = a.sound || 'Other';
                if (!bySound[s]) bySound[s] = {
                    sum: 0,
                    count: 0
                };
                bySound[s].sum += a.accuracy;
                bySound[s].count += 1;
            }
            let lowestAvg = 100;
            for (const [sound, { sum, count }] of Object.entries(bySound)){
                const avg = sum / count;
                if (avg < lowestAvg) {
                    lowestAvg = avg;
                    recommendedSound = sound;
                }
            }
        } else if (recentAttempts.length > 0) {
            const byWord = {};
            for (const a of recentAttempts){
                const w = a.word || 'unknown';
                if (!byWord[w]) byWord[w] = {
                    sum: 0,
                    count: 0
                };
                byWord[w].sum += a.accuracy;
                byWord[w].count += 1;
            }
            let lowestAvg = 100;
            let worstWord = '';
            for (const [word, { sum, count }] of Object.entries(byWord)){
                const avg = sum / count;
                if (avg < lowestAvg) {
                    lowestAvg = avg;
                    worstWord = word;
                }
            }
            if (worstWord) recommendedSound = worstWord;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            lastSession: lastSession ? {
                sessionId: lastSession._id?.toString(),
                attemptCount: lastSession.attemptCount ?? 0,
                startedAt: lastSession.startedAt,
                endedAt: lastSession.endedAt
            } : null,
            recentAttempts: recentAttempts.map((a)=>({
                    word: a.word,
                    sound: a.sound,
                    transcript: a.transcript,
                    accuracy: a.accuracy,
                    needsCorrection: a.needsCorrection,
                    createdAt: a.createdAt
                })),
            recommendedSound
        });
    } catch (e) {
        if (String(e).includes('MONGODB_URI')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                lastSession: null,
                recentAttempts: [],
                recommendedSound: null
            });
        }
        console.error('Dashboard summary error:', e);
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f8e29a1e._.js.map