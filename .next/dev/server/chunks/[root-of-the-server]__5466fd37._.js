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
"[project]/OneDrive/Documents/phonetically/app/api/dashboard/recommended/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
/**
 * GET /api/dashboard/recommended?userId=...
 * Returns recommended sound: { sound, reason, avgAccuracy }
 * Logic: prefer lowest avgAccuracy sound (min 3 attempts if possible), else lowest recent
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/lib/mongodb.ts [app-route] (ecmascript)");
;
;
const DEFAULT_STARTER_SOUNDS = [
    'Short A',
    'TH',
    'R'
];
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const uid = searchParams.get('userId') || 'default';
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        const attempts = await db.collection('attempts').find({
            userId: uid
        }).sort({
            createdAt: -1
        }).project({
            word: 1,
            sound: 1,
            accuracy: 1
        }).toArray();
        if (attempts.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                sound: DEFAULT_STARTER_SOUNDS[0],
                reason: 'Get started with a common sound.',
                avgAccuracy: null
            });
        }
        const bySound = {};
        for (const a of attempts){
            const s = a.sound || 'Other';
            if (!bySound[s]) bySound[s] = {
                sum: 0,
                count: 0
            };
            bySound[s].sum += a.accuracy;
            bySound[s].count += 1;
        }
        const withSound = Object.entries(bySound).filter(([s])=>s !== 'Other').map(([sound, { sum, count }])=>({
                sound,
                avgAccuracy: sum / count,
                count
            }));
        const withEnough = withSound.filter((b)=>b.count >= 3);
        const pool = withEnough.length > 0 ? withEnough : withSound;
        if (pool.length > 0) {
            const worst = pool.reduce((a, b)=>a.avgAccuracy <= b.avgAccuracy ? a : b);
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                sound: worst.sound,
                reason: `Based on your attempts, ${worst.sound} could use more practice.`,
                avgAccuracy: Math.round(worst.avgAccuracy * 10) / 10
            });
        }
        const byWord = {};
        for (const a of attempts.slice(0, 20)){
            const w = a.word || 'unknown';
            if (!byWord[w]) byWord[w] = {
                sum: 0,
                count: 0
            };
            byWord[w].sum += a.accuracy;
            byWord[w].count += 1;
            if (a.sound && !byWord[w].sound) byWord[w].sound = a.sound;
        }
        const wordList = Object.entries(byWord).map(([word, { sum, count, sound }])=>({
                word,
                sound,
                avgAccuracy: sum / count
            }));
        const worst = wordList.reduce((a, b)=>a.avgAccuracy <= b.avgAccuracy ? a : b);
        const fallbackSound = worst.sound || DEFAULT_STARTER_SOUNDS[0];
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            sound: fallbackSound,
            reason: 'Based on your recent attempts.',
            avgAccuracy: Math.round(worst.avgAccuracy * 10) / 10
        });
    } catch (e) {
        if (String(e).includes('MONGODB_URI')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                sound: 'Short A',
                reason: 'Get started with a common sound.',
                avgAccuracy: null
            });
        }
        console.error('Dashboard recommended error:', e);
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5466fd37._.js.map