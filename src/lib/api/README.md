# API Client Structure

This directory contains the BuildPCBs backend API client, organized by domain.

## 📁 File Organization

```
src/lib/api/
├── index.ts          # Barrel exports (import from here)
├── types.ts          # All TypeScript type definitions
├── client.ts         # Base HTTP client utilities
├── agent.ts          # AI Agent & Chat endpoints
├── compiler.ts       # Validation & Compilation endpoints
├── projects.ts       # Project management endpoints
└── components.ts     # Component search & supply chain
```

## 🚀 Usage

### Import from the barrel export:

```typescript
import {
  streamAgentExecution,
  compileECAD,
  searchComponents,
  type CompileResponse,
} from "@/lib/api";
```

### Agent Streaming Example:

```typescript
import { streamAgentExecution } from "@/lib/api";

async function handlePrompt(prompt: string) {
  for await (const event of streamAgentExecution({
    projectId: "project-123",
    prompt,
  })) {
    if (event.type === "thinking") {
      console.log("Status:", event.data);
    }
    if (event.type === "code") {
      setCode(event.code);
    }
  }
}
```

### Compiler Example:

```typescript
import { compileECAD, validateECAD } from "@/lib/api";

// Quick validation
const { valid, errors } = await validateECAD(code);

// Full compilation
const result = await compileECAD(code);
if (result.success) {
  const schematic = result.outputs.schematicSvg;
  const pcb = result.outputs.pcbSvg;
}
```

### Component Search Example:

```typescript
import { searchComponents } from "@/lib/api";

const results = await searchComponents("ATmega328P");
```

## 🎯 Using the React Hook

For easier streaming in components:

```typescript
import { useAgentStream } from '@/hooks/useAgentStream';

function MyComponent() {
  const { execute, isStreaming, latestCode, status } = useAgentStream('project-123');

  return (
    <button onClick={() => execute('Add a USB-C connector')}>
      {isStreaming ? status : 'Send'}
    </button>
  );
}
```

## 🔧 Environment Variables

Set in `.env`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```
