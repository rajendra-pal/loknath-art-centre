# rules.md - Development Guidelines & AI Rules

## 1. What TO Use

### Recommended Libraries & Patterns

| Category | Use This | Why |
|----------|----------|-----|
| State Management | React `useState`, `useContext` | Simple, built-in, no extra deps |
| Styling | Tailwind CSS + CSS variables | Consistency, easy theming |
| UI Components | Radix UI + custom components | Accessible, headless |
| Animations | Framer Motion | React-native, easy API |
| Database | Supabase | Integrated auth, RLS, realtime |
| Forms | Native HTML + controlled inputs | No extra form library needed |
| Icons | Lucide React | Clean, consistent |
| Dates | Native `Date` + `Intl` | No moment/date-fns needed |

### Code Patterns to Follow

```typescript
// ✅ Use TypeScript interfaces for types
interface Order {
  id: string;
  total: number;
  status: string;
}

// ✅ Use cn() utility for conditional classes
import { cn } from '@/lib/utils';
<div className={cn("base-class", condition && "conditional")} />

// ✅ Use proper error handling
try {
  const { data, error } = await supabase.from('table').select('*');
  if (error) throw error;
} catch (err) {
  console.error('Error:', err);
  // Handle error appropriately
}

// ✅ Use proper loading states
const [loading, setLoading] = useState(true);
if (loading) return <LoadingSpinner />;
```

---

## 2. What to AVOID

### Anti-Patterns to Avoid

| Don't Use | Why | Use Instead |
|-----------|-----|-------------|
| Redux | Overkill for this app | React Context |
| Moment.js | Heavy | Native Date |
| Axios | Built-in fetch is fine | fetch or supabase |
| Styled-components | CSS-in-JS is complex | Tailwind + CSS |
| Large component libraries | Bundle bloat | Radix + custom |
| Global state for everything | Unnecessary complexity | Local state |

### Code to Avoid

```typescript
// ❌ Don't use any
const data: any = fetchData();

// ❌ Don't use console.log for production
console.log('User data:', user); // Remove or use proper logging

// ❌ Don't ignore TypeScript errors
// @ts-ignore - NEVER do this

// ❌ Don't hardcode secrets
const API_KEY = "secret-key"; // Use env variables

// ❌ Don't skip error handling
const { data } = await supabase.from('table').select();
// Error is ignored!

// ❌ Don't use inline styles (except rare cases)
<div style={{ color: 'red' }}> // Use Tailwind instead
```

---

## 3. Error Handling Guidelines

### Frontend Error Handling

```typescript
// ✅ Toast notifications for user feedback
import { showToast } from '@/components/ui/toaster';

try {
  await saveData();
  showToast({ title: 'Success', variant: 'success' });
} catch (err) {
  showToast({ title: 'Error', description: 'Failed to save', variant: 'destructive' });
}

// ✅ Form validation
if (!formData.email.includes('@')) {
  showToast({ title: 'Invalid email' });
  return;
}
```

### Backend/Supabase Error Handling

```typescript
// ✅ Always check for Supabase errors
const { data, error } = await supabase
  .from('orders')
  .insert(orderData);

if (error) {
  console.error('Supabase error:', error);
  // Fallback to localStorage or show error
  return;
}
```

---

## 4. AI/Developer Boundaries

### What AI Should NOT Do

| Action | Reason |
|--------|--------|
| Delete files without asking | Irreversible |
| Push to GitHub | Requires authentication |
| Run destructive commands | Could break environment |
| Add external dependencies | Increases bundle size |
| Modify production DB directly | Could lose data |
| Bypass authentication | Security risk |
| Generate sensitive data | Privacy concerns |

### What AI CAN Do (With Approval)

| Action | Requires |
|--------|----------|
| Create new files | Confirmation |
| Modify existing files | Context provided |
| Add comments | Code quality |
| Refactor code | Clear requirements |
| Run tests | Test setup exists |
| Run dev server | User starts it |

### How to Work With AI

1. **Be specific** - "Add a cancel button to the admin orders panel"
2. **Provide context** - "In the student list, I need to add a filter by village"
3. **Ask before destructive actions** - "Should I delete this unused component?"
4. **Review changes** - Always check before committing
5. **Test after changes** - Run tests or verify manually

---

## 5. Project-Specific Guidelines

### Bengali Language Support

- All UI text should support Bengali (বাংলা)
- Use bilingual labels where appropriate
- Example: `placeholder="Phone number / ফোন নম্বর"`

### Indian Payment Integration

- UPI format: `upi://pay?pa={upiId}&pn={name}&am={amount}&tn={orderId}`
- QR codes must be generated client-side (using `qrcode` library)
- Transaction ID capture for payment verification

### Admin Role Requirements

- Admin dashboard requires `role === 'admin'` check
- All admin routes should verify user role
- Admin-only tables use RLS policies

### File Size Warnings

- Component files > 500 lines should be split
- Use component composition
- Move complex logic to custom hooks

---

## 6. Testing Guidelines

### What to Test

| Priority | What | How |
|----------|------|-----|
| High | Auth flow | Integration test |
| High | Cart operations | Unit test |
| Medium | Order submission | Integration test |
| Medium | Admin CRUD | Integration test |
| Low | UI components | Snapshot |

### Test Commands

```bash
npm run test          # Run all tests
npm run test:watch    # Watch mode
```

---

## 7. Git & Version Control

### Git Ignore (Already Configured)

The following should NOT be committed:
- `node_modules/`
- `.next/`
- `.env*` (except `.env.example`)
- `dist/`
- `build/`
- OS-specific files (`.DS_Store`, `Thumbs.db`)

### Commits (When Authorized)

```
feat: Add student details panel to admin dashboard

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## 8. Performance Guidelines

### Do

- ✅ Use `next/image` for images
- ✅ Lazy load components with `dynamic()`
- ✅ Use proper React keys in lists
- ✅ Memoize expensive computations
- ✅ Use proper Tailwind purging

### Don't

- ❌ Load all data at once (use pagination)
- ❌ Render lists without keys
- ❌ Use large images without optimization
- ❌ Bundle unnecessary libraries