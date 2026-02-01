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
"[project]/OneDrive/Documents/phonetically/app/api/therapist/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH
]);
/**
 * Therapist API - CRUD for user target sounds
 * GET: view target sounds for user
 * PATCH: add/remove target sounds, save to MongoDB
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/lib/mongodb.ts [app-route] (ecmascript)");
;
;
const COLLECTION = 'user_profiles';
async function GET(request) {
    try {
        const userId = request.nextUrl.searchParams.get('userId') || 'default';
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        const doc = await db.collection(COLLECTION).findOne({
            userId
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            targetSounds: doc?.targetSounds ?? []
        });
    } catch (e) {
        if (String(e).includes('MONGODB_URI')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                targetSounds: []
            });
        }
        console.error(e);
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to load'
        }, {
            status: 500
        });
    }
}
async function PATCH(request) {
    try {
        const body = await request.json();
        const userId = body.userId || 'default';
        const targetSounds = Array.isArray(body.targetSounds) ? body.targetSounds : [];
        const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
        await db.collection(COLLECTION).updateOne({
            userId
        }, {
            $set: {
                userId,
                targetSounds,
                updatedAt: new Date()
            }
        }, {
            upsert: true
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            targetSounds
        });
    } catch (e) {
        if (String(e).includes('MONGODB_URI')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'MONGODB_URI not configured'
            }, {
                status: 503
            });
        }
        console.error(e);
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to save'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4b145613._.js.map