import { Project, BlogPost, Experience } from "./types";

export const ENGINEER_PROFILE = {
  name: "Sai Ganesh Lolla",
  title: "Senior Full-Stack & Systems Architect",
  tagline: "Building high-performance distributed architectures and highly fluid user interfaces.",
  bio: "I am a software engineer specializing in building robust web applications, real-time synchronization backends, and low-latency cloud infrastructure. Over the past 8+ years, I have worked with hyper-growth startups and mature enterprise teams to scale systems and build polished products that users love.",
  location: "India (Open to Remote / Relocation)",
  email: "saiganeshlolla2000@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  skills: {
    frontend: ["TypeScript", "React / Next.js", "Tailwind CSS", "Redux / Zustand", "WebGL / Three.js", "Vite"],
    backend: ["Node.js / Express", "Go", "Python", "GraphQL", "gRPC", "PostgreSQL", "Redis"],
    cloud: ["Google Cloud Platform", "AWS", "Docker / Kubernetes", "Terraform", "Serverless", "CI/CD Platforms"]
  },
  stats: [
    { label: "Years Experience", value: "8+" },
    { label: "Production Apps", value: "24+" },
    { label: "Blog Readers", value: "12K+" },
    { label: "Open Source Contribs", value: "150+" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "orion-canvas",
    title: "Orion Canvas",
    subtitle: "Real-time collaborative graphics engine and canvas editor",
    description: "A collaborative drawing whiteboard supporting real-time state synchronization, custom shapes, layers, and instant image exporting.",
    longDescription: "Orion Canvas was built to solve the challenges of seamless, lag-free graphic editing between distributed team members. By leveraging Yjs (a Conflict-free Replicated Data Type engine) alongside WebSockets, the app enables hundreds of simultaneous editors to sketch, structure diagrams, and design interfaces together with sub-50ms synchronization latency. It features an advanced rendering engine utilizing HTML5 Canvas layered with React hooks for standard state control, supporting vector drawing, customizable layers, and vector export formats (SVG/PDF).",
    tags: ["TypeScript", "React", "Yjs", "WebSockets", "HTML5 Canvas", "Tailwind CSS"],
    category: "Full Stack",
    imageUrl: "https://picsum.photos/seed/canvas/800/600",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    achievements: [
      "Designed a highly custom spatial-index hashing algorithm in-memory to limit rendering calculation to only elements within the viewport, improving canvas performance at scale.",
      "Maintained rendering performance at 60 FPS even with 5,000+ vector elements active simultaneously on a low-end mobile browser.",
      "Implemented intelligent binary delta compression for WebSocket transmissions, reducing data payload size by up to 68%."
    ],
    architecture: [
      "Client Layer: React state engine coordinating coordinate-transform matrices and managing mouse/touch pointer vectors.",
      "Sync Engine: Integrated CRDT (Yjs) managing atomic operations and resolving collaborative conflicts client-side.",
      "Server Layer: Lightweight Node.js WebSocket gateway broadcasting compressed binary state deltas.",
      "Cache Store: Redis cache tracking room metadata, active viewport frames, and user list memberships."
    ]
  },
  {
    id: "chronosdb",
    title: "ChronosDB",
    subtitle: "High-performance embeddable time-series database engine",
    description: "A lightweight, memory-efficient time-series storage engine written in TypeScript and optimized for telemetry collection.",
    longDescription: "ChronosDB is an embeddable time-series storage layer designed specifically for microservices that need to track high-frequency event timelines without loading heavy relational databases. Built around a Log-Structured Merge-tree (LSM) architectural design, it processes data through an in-memory MemTable before writing persistent, immutable Sorted String Tables (SSTables) to disk, complete with custom Run-Length Encoding (RLE) and Double-Delta compression techniques.",
    tags: ["TypeScript", "Node.js", "LSM-Tree", "Double-Delta", "Data Structures", "Disk I/O"],
    category: "System Design",
    imageUrl: "https://picsum.photos/seed/database/800/600",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    achievements: [
      "Achieved writing speeds of up to 250,000 operations per second on modest cloud compute.",
      "Implemented a custom Double-Delta compression algorithm matching Gorilla TSDB specs, yielding an 8.2x data size compression ratio.",
      "Engineered an automated background compaction controller that merges and cleans SSTable records asynchronously with zero performance degradation on primary writes."
    ],
    architecture: [
      "In-Memory MemTable: Skip-list backed fast-write layer with atomic append-only log (WAL) synchronization.",
      "Background Compactor: Multi-tier merge algorithm analyzing read frequencies and sorting indices.",
      "Index Cache: Bloom filters loaded into active RAM to guarantee O(1) checks for non-existent primary keys."
    ]
  },
  {
    id: "aura-commerce",
    title: "Aura Commerce",
    subtitle: "Serverless global e-commerce engine with edge caching",
    description: "A lightning-fast, globally distributed shopping experience with localized checkout, dynamic inventory matching, and instant page loading.",
    longDescription: "Aura Commerce is a full-stack, enterprise-grade shopping platform optimized to deliver web pages in under 1.2 seconds globally. Using a modern static-regeneration paradigm paired with edge microservices, product grids and pricing maps are cached in edge-nodes globally, with on-demand inventory checks managed by a serverless GraphQL backend. It is fully integrated with secure Stripe webhooks and local automated taxation services.",
    tags: ["React", "Next.js", "GraphQL", "GCP", "Stripe API", "Edge Functions"],
    category: "Full Stack",
    imageUrl: "https://picsum.photos/seed/commerce/800/600",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    achievements: [
      "Improved Google Lighthouse performance scores from 74 to 99, achieving fully interactive states in 950ms.",
      "Engineered a lock-free distributed inventory reservation mechanism utilizing Redis Transactions, preventing race conditions during flash sales.",
      "Designed a localized multi-currency routing pipeline serving 14 currencies across 8 region nodes seamlessly."
    ],
    architecture: [
      "Static Host: Edge-cached statically generated storefront utilizing localized static parameters.",
      "API Middleware: Edge middleware processing IP-based routing for currency, tax calculations, and localized inventories.",
      "Microservice Stack: Express-based Apollo GraphQL API querying distributed transactional Cloud Spanner instances."
    ]
  },
  {
    id: "aether-analytics",
    title: "Aether Analytics",
    subtitle: "Real-time geographical telemetry & infrastructure monitor",
    description: "An advanced operations dashboard visualizing distributed server performance, networking latency, and edge requests in real time.",
    longDescription: "Aether Analytics acts as a command center for edge-network operations. It aggregates telemetry logs across dozens of geographic compute points, computing real-time average response rates, data throughput, and HTTP status statistics. Features rich interactive maps, custom alert rules, threshold dashboards, and dynamic data filtering built in high-performance D3 and SVG charting.",
    tags: ["TypeScript", "D3.js", "Recharts", "Node.js", "Redis PubSub", "Tailwind CSS"],
    category: "Cloud Infrastructure",
    imageUrl: "https://picsum.photos/seed/telemetry/800/600",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    achievements: [
      "Capable of parsing, digesting, and visualizing 10,000 incoming metrics records per second per client dashboard in real-time.",
      "Constructed reusable chart elements leveraging D3 data joints, guaranteeing lag-free updates during heavy canvas scaling.",
      "Devised a memory-efficient rolling aggregate buffer in the Node server, preventing heap allocation memory leaks under spikes."
    ],
    architecture: [
      "Aggregator Nodes: High-throughput ingestion agents parsing raw HTTP request formats.",
      "PubSub Queue: Redis channel routing processed log updates to the active socket server pools.",
      "Front-End Client: Smooth React charting pipelines utilizing customizable WebGL maps and D3 line-interpolation paths."
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "realtime-collab-engine",
    title: "Architecting a Real-Time Collaborative Canvas: CRDTs and WebSockets",
    summary: "A deep-dive into resolving collaborative editing conflicts, designing scalable WebSocket channels, and ensuring smooth rendering performance in browser canvases.",
    content: `
### The Problem of Collaborative Coherence

When multiple users are sketching simultaneously on a digital canvas, the standard client-server request model breaks down. If User A moves a circle to the left at the exact millisecond User B rescales it, standard database writes result in erratic jumps, lost progress, and out-of-sync canvases.

To construct a responsive collaborative experience, we must solve three engineering hurdles:
1. **Low Latency Communication**: Minimizing transport delay between users.
2. **Deterministic Conflict Resolution**: Ensuring all clients reach the exact same visual state, regardless of the sequence in which edits arrive.
3. **Smooth Rendering Pipelines**: Redrawing elements dynamically without choking the main browser thread.

---

### Phase 1: Leveraging WebSockets and Binary Protocols

While HTTP polling is out of the question, standard text-based JSON over WebSockets is often a bottleneck when streaming rapid cursor vectors or drawing coordinates. 

In Orion Canvas, we adopted a custom binary packet structure using JavaScript **ArrayBuffers** and **TypedArrays**. Instead of sending:
\`\`\`json
{ "type": "MOVE", "id": "shape-123", "x": 450.2, "y": 128.5 }
\`\`\`
We pack the command into an 18-byte buffer:
- **Bytes 0-1**: Action Code (\`0x02\` for Move)
- **Bytes 2-9**: Shape UUID hash
- **Bytes 10-13**: IEEE 754 32-bit Float for Coordinate X
- **Bytes 14-17**: IEEE 754 32-bit Float for Coordinate Y

This binary approach reduced the network throughput overhead by **over 70%**, enabling more frequent position broadcasts without triggering network congestion or browser packet bottlenecks.

---

### Phase 2: Conflict Resolution via Yjs CRDTs

To guarantee eventual consistency, we avoided server-side state locking. Instead, we turned to **Conflict-free Replicated Data Types (CRDTs)**, specifically utilizing **Yjs**. 

Yjs models the collaborative document as a tree of operations, where each edit is tagged with a unique Client ID and a local sequential Lamport timestamp. When edits overlap:
- Elements are inserted or deleted relative to neighbor nodes, rather than absolute array indices.
- Operations commute deterministically; every browser evaluates conflicting updates exactly the same way without requiring an authoritative coordinator.

Here is a simplified code module showing how we hook the React component state into the Yjs map:

\`\`\`typescript
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

export function useCollaborativeCanvas(roomId: string) {
  const doc = new Y.Doc();
  const provider = new WebsocketProvider('wss://api.orion.io', roomId, doc);
  const sharedShapes = doc.getMap('shapes');

  const updateShapePosition = (shapeId: string, x: number, y: number) => {
    doc.transact(() => {
      const shape = sharedShapes.get(shapeId) as Y.Map<any>;
      if (shape) {
        shape.set('x', x);
        shape.set('y', y);
      }
    });
  };

  return { sharedShapes, updateShapePosition };
}
\`\`\`

---

### Phase 3: Optimizing the Render Loop to 60 FPS

Updating React state on every single coordinate change would instantly kill rendering performance due to React's Virtual DOM diffing overhead. 

To bypass this bottleneck:
1. **Decouple Input from State**: Capture mouse coordinates inside a mutable React \`useRef\`.
2. **RequestAnimationFrame (rAF)**: Run a continuous drawing loop using the browser's \`requestAnimationFrame\` schedule.
3. **Draw Directly**: Read coordinates directly from the ref and paint directly to the HTML5 \`<canvas>\` context. React is only notified when a user *releases* their cursor to commit final changes back to the shared CRDT state.

\`\`\`typescript
useEffect(() => {
  let animationFrameId: number;
  
  const renderLoop = () => {
    // 1. Clear previous frame viewport
    ctx.clearRect(0, 0, width, height);
    
    // 2. Render static shapes from state cache
    renderStaticShapes(ctx, shapes);
    
    // 3. Render active, fast-moving cursor directly from volatile ref
    if (activeDragRef.current) {
      renderActiveDraftShape(ctx, activeDragRef.current);
    }
    
    animationFrameId = requestAnimationFrame(renderLoop);
  };
  
  animationFrameId = requestAnimationFrame(renderLoop);
  return () => cancelAnimationFrame(animationFrameId);
}, [shapes]);
\`\`\`

---

### Summary of Results

By combining **binary web protocols**, client-side **CRDT engines**, and **direct canvas rendering bypasses**, we scaled our real-time board to accommodate 150 concurrent collaborators seamlessly. The interaction feels entirely local, hiding the complex network logic entirely behind elegant, intuitive visual brushes.
`,
    publishedAt: "July 12, 2026",
    readTime: "8 min read",
    tags: ["Distributed Systems", "WebSockets", "CRDT", "React", "Canvas API"],
    category: "Engineering",
    imageUrl: "https://picsum.photos/seed/canvas-blog/800/600"
  },
  {
    id: "edge-caching-redis",
    title: "How I Reduced API Latency by 42% Using Edge Caching and Redis Pipelines",
    summary: "An architectural study on solving heavy backend workloads by offloading queries to regional CDN nodes and bundling database requests using Redis query pipelining.",
    content: `
### The Latency Problem in Globally Distributed Applications

When a user in Munich clicks on a product details page, and the application backend sits in an AWS region in Northern Virginia, the laws of physics impose a minimum **110ms round-trip latency** purely for the network packet travel. Add database query time, SSL negotiation, and API serialization, and the total Time To First Byte (TTFB) easily climbs past **350ms**.

For a e-commerce or SaaS company, this latency directly correlates to customer bounce rates. To tackle this, we redesigned our API layers around two powerful principles: **Edge Compute caching** and **in-memory database pipelining**.

---

### Strategy 1: Bringing Data to the Edge

Instead of routing every API call back to the primary database, we migrated static configurations, localized product tables, and user metadata to **Edge Functions**.

Edge functions execute within regional CDN nodes, meaning the server is sitting literally miles away from the end-user. However, querying a centralized Postgres DB from an Edge function still introduces regional network delays. 

To solve this, we placed a distributed read-replica layer closer to regional clusters, coupled with strict Cache-Control headers:

\`\`\`typescript
export async function handleRequest(request: Request) {
  const url = new URL(request.url);
  const cacheKey = url.pathname + url.search;
  
  // 1. Check regional Edge Cache memory
  const cachedResponse = await caches.default.match(cacheKey);
  if (cachedResponse) {
    // Add custom header to monitor edge performance
    const headers = new Headers(cachedResponse.headers);
    headers.set('X-Cache', 'HIT-EDGE');
    return new Response(cachedResponse.body, { ...cachedResponse, headers });
  }

  // 2. If missed, execute the lightweight regional routing...
}
\`\`\`

---

### Strategy 2: Redis Query Pipelining

For queries that must hit our primary database clusters, we optimized the interaction layer. Often, a single webpage needs to pull 5 or 6 independent data chunks (e.g., user profile, cart count, site announcements, recommended products).

Executing these queries sequentially inside the backend results in "waterfall" delays:
- Query 1: 15ms
- Query 2: 12ms
- Query 3: 20ms
- **Total: 47ms waiting on database network round-trips**

By using **Redis Pipelining**, the backend sends all 5 commands to Redis in a single TCP packet. Redis processes all commands in memory sequentially and returns the results in a single response bundle.

Below is an illustration of how to implement pipelining using modern Node Redis clients:

\`\`\`typescript
import { createClient } from 'redis';

async function fetchUserDashboardData(userId: string) {
  const client = createClient();
  await client.connect();

  // Establish a pipeline buffer
  const pipeline = client.multi();

  pipeline.get('user:' + userId + ':profile');
  pipeline.get('user:' + userId + ':notifications');
  pipeline.sMembers('user:' + userId + ':permissions');
  pipeline.zRange('user:' + userId + ':recent_activity', 0, 10);

  // Execute all commands in a single round-trip
  const [profile, alerts, roles, history] = await pipeline.exec();

  return { profile, alerts, roles, history };
}
\`\`\`

---

### The Architecture Map

The unified flow consists of:
1. **User Request** hits nearest Edge CDN.
2. **Edge Node** attempts cache lookup. If valid, responds in **15ms**.
3. **If Cache Misses**, request lands in Regional Gateway.
4. **Gateway API** issues pipelined queries to Redis Cluster (or queries PostgreSQL if cold state).
5. **Cache-Control headers** are computed and sent along with response, populating the Edge node on its way back.

---

### Measurable Impacts

By executing this architectural overhaul, our global average response latency dropped from **290ms down to 168ms** (a 42% reduction), while concurrent server cluster load dropped by **35%**, leading to substantial hosting cost savings and an exceptionally snappy user experience.
`,
    publishedAt: "May 20, 2026",
    readTime: "6 min read",
    tags: ["Redis", "Edge Computing", "System Architecture", "Performance", "Caches"],
    category: "System Design",
    imageUrl: "https://picsum.photos/seed/redis-blog/800/600"
  },
  {
    id: "react-19-pragmatic-guide",
    title: "Mastering React 19: Server Actions, Transition APIs, and the Compiler",
    summary: "Get ahead with React 19's revolutionary changes. Discover how the new compiler eliminates useMemo, and how Server Actions change the state-handling paradigm.",
    content: `
### Welcome to the React 19 Era

React 19 represents one of the most fundamental shifts in the library's history. Unlike previous releases which focused on internal fiber scheduler mechanics, React 19 introduces native developer conveniences that simplify rendering optimizations and state management.

Let's break down the three pillars of React 19 that you should adopt in your software engineering toolkit today:
1. **The React Compiler** (No more \`useMemo\` and \`useCallback\`)
2. **Action Hooks** (\`useActionState\` and \`useOptimistic\`)
3. **The Document Metadata engine**

---

### Pillar 1: The React Compiler (Auto-Memoization)

Historically, preventing unnecessary component re-renders required tedious manual wrapping of data structures:

\`\`\`tsx
// React 18: Manual overhead
const filteredData = useMemo(() => {
  return items.filter(item => item.active === activeOnly);
}, [items, activeOnly]);

const handleSelect = useCallback((id) => {
  setSelectedId(id);
}, []);
\`\`\`

If you missed a single item in the dependency array, you introduced insidious UI bugs or memory leaks. 

In React 19, the **React Compiler** parses your code at build time, inserting fine-grained memoization pathways automatically wherever performance benefits are detected. Component dependencies are analyzed syntactically, letting you write plain JavaScript without losing performance.

---

### Pillar 2: Action Hooks for Async Operations

React 19 elevates async transactions to first-class citizens. When submitting a contact form or making a database update, we can leverage standard async handlers ("Actions") wrapped in state managers.

#### Using \`useActionState\`

The new \`useActionState\` hook manages async actions and yields the pending state automatically:

\`\`\`tsx
import { useActionState } from 'react';

async function updateNewsletterList(prevState: any, formData: FormData) {
  const email = formData.get("email");
  try {
    await api.subscribeEmail(email);
    return { success: true, message: "Subscribed!" };
  } catch (err) {
    return { success: false, message: "Subscription failed." };
  }
}

function SubscriptionForm() {
  const [state, formAction, isPending] = useActionState(updateNewsletterList, null);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input name="email" type="email" required placeholder="Enter developer email..." />
      <button type="submit" disabled={isPending} className="bg-emerald-600 p-2 text-white">
        {isPending ? 'Joining...' : 'Subscribe'}
      </button>
      {state && <p>{state.message}</p>}
    </form>
  );
}
\`\`\`

This pattern dramatically reduces boilerplate code, managing \`loading\`, \`error\`, and \`data\` parameters within a single native structure.

---

### Pillar 3: Dynamic Optimistic UI Updates

Users hate waiting for server responses before seeing their interface update. The new \`useOptimistic\` hook enables updating states instantly, automatically rolling back to the truth if the underlying server request fails.

\`\`\`tsx
import { useOptimistic } from 'react';

// Within a component:
const [optimisticTasks, setOptimisticTasks] = useOptimistic(
  tasks,
  (state, newTask) => [...state, { ...newTask, status: 'sending' }]
);
\`\`\`

This creates incredibly snappy user interfaces, bringing mobile-application fluid responsiveness directly to standard web client pages.

---

### Conclusion

React 19 is not just an update; it's a simplification. It frees developers from fighting the framework's reconciliation engine, allowing us to spend more time designing robust business models, high-fidelity layouts, and robust software architectures.
`,
    publishedAt: "April 05, 2026",
    readTime: "5 min read",
    tags: ["React 19", "JavaScript", "Frontend", "Server Actions", "Performance"],
    category: "Tutorials",
    imageUrl: "https://picsum.photos/seed/react-blog/800/600"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "lead-vortex",
    role: "Lead Software Engineer / Architect",
    company: "Vortex Labs",
    location: "San Francisco, CA",
    period: "2024 - Present",
    bullets: [
      "Architected and deployed a multi-region Redis-caching gateway reducing corporate microservice API workloads by 42% globally.",
      "Lead a team of 6 engineers rebuilding the company's real-time dashboard from legacy Backbone codebases into high-performance React 19.",
      "Established strict Infrastructure as Code (Terraform) pipelines, automating GCP provisioning and cutting monthly compute overhead by 22%."
    ],
    skillsUsed: ["Next.js", "TypeScript", "Node.js", "Redis", "Google Cloud Platform", "Kubernetes", "Terraform"]
  },
  {
    id: "snr-stellar",
    role: "Senior Full-Stack Engineer",
    company: "Stellar Scale",
    location: "Remote",
    period: "2021 - 2024",
    bullets: [
      "Engineered real-time collaboration canvas backend supporting 5,000+ active sessions with under 50ms average state synchronization.",
      "Designed and implemented high-volume Stripe checkout pipelines handling $14M+ in annual transactional revenue with zero fault rates.",
      "Spearheaded web accessibility (WCAG 2.1 AA) guidelines across entire core product catalog, boosting conversion rates by 12%."
    ],
    skillsUsed: ["React", "HTML5 Canvas", "Yjs", "WebSockets", "Go", "PostgreSQL", "Docker", "Stripe API"]
  },
  {
    id: "full-byte",
    role: "Full Stack Developer",
    company: "ByteCrafters Co.",
    location: "Austin, TX",
    period: "2019 - 2021",
    bullets: [
      "Developed secure authentication middleware, dynamic routing, and GraphQL microservice schemas catering to 250,000+ monthly unique users.",
      "Designed custom interactive telemetry charting utilities in D3.js, empowering operations analysts to query database statuses in real-time.",
      "Refactored Docker continuous integration workflows, reducing dev deployment times from 18 minutes down to 4 minutes."
    ],
    skillsUsed: ["React", "D3.js", "Express.js", "GraphQL", "Docker", "PostgreSQL", "GitHub Actions"]
  }
];
