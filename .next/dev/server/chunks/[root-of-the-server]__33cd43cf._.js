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
"[project]/OneDrive/Documents/phonetically/lib/mongoose.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectDb",
    ()=>connectDb
]);
/**
 * Mongoose connection for Phona practice (Sessions, Attempts)
 * Uses MONGODB_URI env variable. Hot-reload safe: cache in global to avoid
 * multiple connections in Next.js dev.
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/OneDrive/Documents/phonetically/node_modules/mongoose)");
;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.warn('MONGODB_URI not set - Phona practice persistence disabled');
}
async function connectDb() {
    if (!MONGODB_URI) throw new Error('MONGODB_URI not configured');
    if (!global._mongooseConn) global._mongooseConn = {
        conn: null,
        promise: null
    };
    const cached = global._mongooseConn;
    if (cached.conn) return cached.conn;
    if (!cached.promise) cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI);
    cached.conn = await cached.promise;
    return cached.conn;
}
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
"[project]/OneDrive/Documents/phonetically/lib/models/Attempt.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
/**
 * Attempt model - single pronunciation attempt
 * Schema: userId, sessionId, word, sound, transcript, accuracy, needsCorrection, createdAt
 */ var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/OneDrive/Documents/phonetically/node_modules/mongoose)");
;
const AttemptSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$mongoose$29$__["default"].Schema({
    userId: {
        type: String,
        required: true
    },
    sessionId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$mongoose$29$__["default"].Schema.Types.ObjectId,
        ref: 'Session'
    },
    word: {
        type: String,
        required: true
    },
    phonetics: {
        type: String,
        default: null
    },
    sound: {
        type: String,
        default: null
    },
    syllables: [
        {
            type: String
        }
    ],
    transcript: {
        type: String,
        default: ''
    },
    accuracy: {
        type: Number,
        required: true
    },
    needsCorrection: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$mongoose$29$__["default"].models.Attempt || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$mongoose$29$__["default"].model('Attempt', AttemptSchema);
}),
"[project]/OneDrive/Documents/phonetically/lib/utils/syllables.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Basic syllable splitter - placeholder for future replacement
 * Splits before vowel groups, returns 2-5 chunks
 */ __turbopack_context__.s([
    "splitSyllables",
    ()=>splitSyllables
]);
function splitSyllables(word) {
    const normalized = word.trim().toLowerCase().replace(/[^a-z]/g, '');
    if (!normalized) return [
        word
    ];
    const parts = [];
    let i = 0;
    while(i < normalized.length){
        const rest = normalized.slice(i);
        const m = rest.match(/^[^aeiouy]*[aeiouy]+/);
        const chunk = m ? m[0] : rest[0];
        if (chunk) {
            parts.push(chunk);
            i += chunk.length;
        } else break;
    }
    const result = parts.length > 0 ? parts : [
        normalized
    ];
    return result.length <= 5 ? result : result.slice(0, 5);
}
}),
"[project]/OneDrive/Documents/phonetically/app/api/practice/score/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
/**
 * POST /api/practice/score
 * Scores transcript vs target word, saves Attempt, increments Session.attemptCount
 * Returns accuracy, needsCorrection, syllables, attemptCount
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$mongodb$29$__ = __turbopack_context__.i("[externals]/mongodb [external] (mongodb, cjs, [project]/OneDrive/Documents/phonetically/node_modules/mongodb)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$lib$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/lib/mongoose.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$lib$2f$models$2f$Attempt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/lib/models/Attempt.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$lib$2f$utils$2f$syllables$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Documents/phonetically/lib/utils/syllables.ts [app-route] (ecmascript)");
;
;
;
;
;
;
function normalize(s) {
    return s.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
}
function editDistance(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = Array(m + 1).fill(null).map(()=>Array(n + 1).fill(0));
    for(let i = 0; i <= m; i++)dp[i][0] = i;
    for(let j = 0; j <= n; j++)dp[0][j] = j;
    for(let i = 1; i <= m; i++){
        for(let j = 1; j <= n; j++){
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        }
    }
    return dp[m][n];
}
function similarity(a, b) {
    const na = normalize(a);
    const nb = normalize(b);
    if (!na || !nb) return 0;
    if (na === nb) return 1;
    const maxLen = Math.max(na.length, nb.length);
    const dist = editDistance(na, nb);
    return Math.max(0, 1 - dist / maxLen);
}
async function POST(request) {
    try {
        const body = await request.json();
        const { word, transcript, sessionId, userId, sound, phonetics } = body;
        if (!word || typeof word !== 'string') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Missing word'
            }, {
                status: 400
            });
        }
        const trans = typeof transcript === 'string' ? transcript : '';
        const uid = userId || 'default';
        const sim = similarity(trans, word);
        const accuracy = Math.round(Math.min(100, Math.max(0, sim * 100)));
        const needsCorrection = accuracy < 90;
        const syllables = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$lib$2f$utils$2f$syllables$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["splitSyllables"])(word);
        // Heuristic: very long transcript + very low accuracy may indicate noisy environment (garbled speech)
        const na = normalize(word);
        const nt = normalize(trans);
        const tooNoisy = nt.length > na.length * 2 && accuracy < 35;
        let attemptCount;
        if (sessionId && uid) {
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$lib$2f$mongoose$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectDb"])();
                await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$lib$2f$models$2f$Attempt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
                    userId: uid,
                    sessionId: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$mongodb$29$__["ObjectId"](sessionId),
                    word,
                    phonetics: phonetics || null,
                    sound: sound || null,
                    syllables,
                    transcript: trans,
                    accuracy,
                    needsCorrection
                });
                const db = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
                const updated = await db.collection('sessions').findOneAndUpdate({
                    _id: new __TURBOPACK__imported__module__$5b$externals$5d2f$mongodb__$5b$external$5d$__$28$mongodb$2c$__cjs$2c$__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$mongodb$29$__["ObjectId"](sessionId)
                }, {
                    $inc: {
                        attemptCount: 1
                    }
                }, {
                    returnDocument: 'after'
                });
                attemptCount = updated?.attemptCount ?? 1;
            } catch (e) {
                console.error('Attempt save error:', e);
            }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            accuracy,
            needsCorrection,
            syllables,
            attemptCount,
            tooNoisy: tooNoisy || undefined
        });
    } catch (e) {
        console.error('Score API error:', e);
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Documents$2f$phonetically$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__33cd43cf._.js.map