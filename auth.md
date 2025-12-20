Below are the **roles** required for SkillHub Pro based on your full system design (LMS + multi-tenant + e-commerce + real-time + content creation + admin panels).

I’m giving you **two levels**:

1. **System-level core roles** (platform-wide)
2. **Organization-level roles** (per tenant)

This matches your multi-tenant architecture.

---

# ✅ **1. SYSTEM-LEVEL ROLES (GLOBAL PLATFORM ROLES)**

These roles belong to **your platform**, not to an individual organization.

### **1. Super Admin**

Highest-level role. Full control over entire platform.

**Permissions:**

- Manage all organizations
- Suspend/ban users
- Manage global settings
- View global analytics
- Manage payment settings
- Approve refund requests (platform-level)
- Access logs & system monitoring

---

### **2. Support Admin**

Lower than Super Admin.

**Permissions:**

- View organizations
- Help resolve user issues
- Handle tickets
- Reset user MFA
- Basic reporting

---

### **3. Developer / Technical Admin (optional)**

Internal team role.

**Permissions:**

- Access API keys
- View logs
- Manage integrations
- Run system diagnostics

---

# ✅ **2. ORGANIZATION-LEVEL ROLES (PER TENANT)**

Every organization has its own roles and permissions.

This is where most LMS functionality lives.

### **1. Organization Admin (Owner)**

Highest role inside a tenant.

**Permissions:**

- Manage users inside the organization
- Manage roles & permissions
- Create/manage courses
- Manage white-labeling (logo, domain)
- Access all analytics
- Manage billing for their org subscription
- Approve instructors & creators

---

### **2. Instructor**

Responsible for teaching & course creation.

**Permissions:**

- Create & edit courses
- Upload content/videos
- Manage assessments & quizzes
- Host live classes
- Grade assignments
- View learner analytics
- Moderate course forums

---

### **3. Content Creator**

This is different from Instructor.

**Permissions:**

- Create lesson content
- Upload videos / PDFs
- Edit drafts
- Cannot publish a course
- Cannot view student data

**Instructor or Admin must approve/publish.**

---

### **4. Moderator**

Handles community & discussions.

**Permissions:**

- Manage comments & discussions
- Block users (organization-level)
- Approve forum posts
- Remove spam/abusive content

---

### **5. Student**

The learner.

**Permissions:**

- Access enrolled courses
- Watch videos & complete lessons
- Take quizzes
- Download certificates
- Participate in discussions
- Track their own progress

---

### **6. Guest / Visitor**

Not logged in or not enrolled.

**Permissions:**

- Browse public courses
- View marketing pages
- Add items to cart
- Limited content previews

---

# 🧩 OPTIONAL ADVANCED ROLES (IF YOU WANT GRANULAR CONTROL)

### **7. Teaching Assistant (TA)**

- Grade assignments
- Manage Q&A
- Help in live sessions

### **8. Sales Manager**

- Manage coupon codes
- Manage bulk enrollments
- Handle organization-level billing

### **9. Affiliate Partner**

- Has referral link
- View affiliate earnings
- No admin access

---

# 🎯 FINAL RECOMMENDED ROLE LIST (CLEAN VERSION)

## 🌐 **Platform Roles**

| Role           | Scope  | Permissions                        |
| -------------- | ------ | ---------------------------------- |
| Super Admin    | Global | Everything                         |
| Support Admin  | Global | Support features                   |
| Dev/Tech Admin | Global | Logs, integrations, system configs |

---

## 🏢 **Organization Roles**

| Role               | Scope        | Permissions               |
| ------------------ | ------------ | ------------------------- |
| Organization Admin | Tenant       | All org data, all courses |
| Instructor         | Course-level | Create & teach courses    |
| Content Creator    | Course draft | Create/edit content       |
| Moderator          | Community    | Discussions & reports     |
| Student            | Learning     | Take courses              |
| Guest              | Public       | Browse only               |

---

# If you want, I can give you:

### ✅ Permissions matrix (role × features)

### ✅ JSON permissions schema

### ✅ RBAC + ABAC hybrid model

### ✅ Database tables for roles & permissions

### ✅ Access control middleware structure (Node.js + Go + Java)

Just tell me:
**“Give me permission table”** or **“Give me schema”** or **“Give me RBAC implementation”**.

# Permission system bundle — everything you asked for

Below is a complete, practical package you can drop into SkillHub Pro:

1. Permission matrix (role × feature)
2. JSON permissions schema (authoritative)
3. RBAC + ABAC hybrid model design and examples
4. Database schema (Postgres) with SQL for roles/permissions/assignments + sample seeds
5. Access-control middleware patterns & example implementations for **Node.js (Express + TypeScript)**, **Go**, and **Java (Spring Boot)**
6. Common policy examples, idempotency & caching hints, and test cases

Use these artifacts to implement secure, flexible authorization across services.

---

# 1) Permission matrix (compact)

Columns: feature groups. `✓` = allowed, `—` = not allowed, `(own)` = limited to own resources.

| Role \ Feature              | Manage org |  Manage users | Create courses | Publish | Upload media |   Grade | Enroll users | View org analytics | Billing | Forum moderation | View own progress |
| --------------------------- | ---------: | ------------: | -------------: | ------: | -----------: | ------: | -----------: | -----------------: | ------: | ---------------: | ----------------: |
| Super Admin (platform)      |          ✓ |             ✓ |              ✓ |       ✓ |            ✓ |       ✓ |            ✓ |                  ✓ |       ✓ |                ✓ |                 ✓ |
| Support Admin (platform)    |          — | ✓ (reset/MFA) |              — |       — |            — |       — |            — |        ✓ (limited) |       — |                ✓ |                 ✓ |
| Dev/Tech Admin (platform)   |  ✓ (infra) |             ✓ |              — |       — |            — |       — |            — |                  ✓ |       ✓ |                — |                 — |
| Organization Admin (tenant) |          ✓ |             ✓ |              ✓ |       ✓ |            ✓ |       ✓ |            ✓ |                  ✓ |       ✓ |                ✓ |                 ✓ |
| Instructor                  |          — |             — |              ✓ | ✓ (own) |            ✓ |       ✓ |            — |   ✓ (course-level) |       — |                ✓ |                 ✓ |
| Content Creator             |          — |             — |      ✓ (draft) |       — |            ✓ |       — |            — |                  — |       — |                — |                 ✓ |
| Moderator                   |          — |             — |              — |       — |            — |       — |            — |                  — |       — |                ✓ |                 ✓ |
| Teaching Assistant          |          — |             — |              — |       — |            — | ✓ (own) |            — |                  — |       — |                ✓ |                   |
| Student                     |          — |             — |              — |       — |            — |       — |            — |                  — |       — |     ✓ (comments) |                 ✓ |
| Guest                       |          — |             — |              — |       — |            — |       — |            — |                  — |       — |                — |                 — |

---

# 2) JSON permissions schema (authoritative)

Use this as canonical permission registry. Services should import this to seed DB and for runtime checks.

```json
{
  "permissions": {
    "org.manage": "Manage organization settings, branding, domains",
    "org.users.manage": "Invite/remove org users & roles",
    "courses.create": "Create course records (drafts)",
    "courses.edit": "Edit course content",
    "courses.publish": "Publish course (make available to students)",
    "content.upload": "Obtain presigned upload URL and register content",
    "content.transcode": "Trigger/manage transcode jobs (internal)",
    "assessments.create": "Create quizzes and assessments",
    "assessments.grade": "Grade assignments and provide feedback",
    "enrollments.manage": "Manually enroll or remove users from a course",
    "payments.view": "View billing & invoices",
    "billing.manage": "Change organization subscription and payment methods",
    "forum.moderate": "Moderate forum posts and comments",
    "analytics.view": "View organization analytics",
    "user.self.read": "Read own profile and progress",
    "user.sessions.manage": "Revoke sessions for a user",
    "system.admin": "Platform-level administration (Super Admin)",
    "webhook.manage": "Manage webhooks & integrations"
  },
  "roles": {
    "super_admin": [
      "system.admin",
      "org.manage",
      "org.users.manage",
      "analytics.view",
      "billing.manage",
      "webhook.manage"
    ],
    "support_admin": ["user.sessions.manage", "analytics.view"],
    "dev_admin": ["webhook.manage", "analytics.view"],
    "org_admin": [
      "org.manage",
      "org.users.manage",
      "courses.create",
      "courses.edit",
      "courses.publish",
      "content.upload",
      "assessments.create",
      "assessments.grade",
      "enrollments.manage",
      "analytics.view",
      "billing.manage",
      "forum.moderate"
    ],
    "instructor": [
      "courses.create",
      "courses.edit",
      "courses.publish",
      "content.upload",
      "assessments.create",
      "assessments.grade",
      "analytics.view"
    ],
    "content_creator": ["courses.create", "courses.edit", "content.upload"],
    "moderator": ["forum.moderate"],
    "teaching_assistant": ["assessments.grade", "courses.edit"],
    "student": ["user.self.read"],
    "guest": []
  },
  "scopes": {
    "platform": ["super_admin", "support_admin", "dev_admin"],
    "organization": [
      "org_admin",
      "instructor",
      "content_creator",
      "moderator",
      "teaching_assistant",
      "student",
      "guest"
    ]
  }
}
```

---

# 3) RBAC + ABAC hybrid model

**Goal:** combine role-based (coarse) permissions with attribute-based checks (fine-grained).

## Concepts

- **RBAC**: Roles map to permission sets (from JSON above). Easy to assign & audit.
- **ABAC**: Policies that use attributes (resource.owner_id, organization_id, resource.state, user.tenure, time_of_day, user.groups, IP geolocation) to make context-aware decisions.
- **Decision flow** (authorization pipeline):
  1. Authenticate user → produce `user` object: `{ user_id, roles: [...], org_id, claims, device_id }`.
  2. Authorizer checks role permissions for requested action.
  3. If RBAC grants permission unconditionally → allow.
  4. Else evaluate ABAC policies (policy engine) which consider resource attributes and environment.
  5. Deny if neither grants access.

## Example ABAC rules

- `courses.edit` allowed if `(user.roles contains "instructor" OR "org_admin") AND resource.course.org_id == user.org_id`.
- `courses.publish` allowed if `resource.draft == true AND user.role == instructor AND user.has_permission("courses.publish") AND user.account_verified == true`.
- `content.upload` allowed if `user.storage_quota_remaining > file_size OR org.storage_quota_remaining > file_size`.

## Policy storage

- **Static**: JSON policies checked in memory for speed.
- **Dynamic**: Store ABAC policies in DB (for tenant-level overrides).
- **Policy engine**: Use OPA (Open Policy Agent) or a lightweight rules engine.

---

# 4) Database schema (Postgres) — roles, permissions, assignments

SQL includes RBAC tables, ABAC attributes for user/org, and audit tables.

```sql
-- 1. extension for UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- roles & permissions registry (seeded from JSON)
CREATE TABLE auth_permissions (
  permission_key TEXT PRIMARY KEY,
  description TEXT NOT NULL
);

CREATE TABLE auth_roles (
  role_key TEXT PRIMARY KEY,
  description TEXT NOT NULL
);

CREATE TABLE auth_role_permissions (
  role_key TEXT NOT NULL REFERENCES auth_roles(role_key) ON DELETE CASCADE,
  permission_key TEXT NOT NULL REFERENCES auth_permissions(permission_key) ON DELETE CASCADE,
  PRIMARY KEY(role_key, permission_key)
);

-- user & role assignment (tenant-aware)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  is_platform_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE user_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  role_key TEXT NOT NULL REFERENCES auth_roles(role_key),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, org_id, role_key)
);

-- Optional: ABAC attributes per user and per org (JSONB)
CREATE TABLE user_attributes (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  attrs JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE org_attributes (
  org_id UUID PRIMARY KEY REFERENCES organizations(id),
  attrs JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Audit table for role changes
CREATE TABLE role_assignment_audit (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL, -- assign / revoke
  user_id UUID,
  org_id UUID,
  role_key TEXT,
  performed_by UUID,
  performed_at TIMESTAMPTZ DEFAULT now(),
  meta JSONB
);
```

### Seed example (insert core permissions & roles)

```sql
-- permissions
INSERT INTO auth_permissions(permission_key, description) VALUES
('org.manage', 'Manage organization settings'),
('org.users.manage', 'Invite/remove org users & roles'),
('courses.create', 'Create course records'),
('courses.edit', 'Edit course content'),
('courses.publish', 'Publish course'),
('content.upload', 'Upload content'),
('assessments.create', 'Create assessments'),
('assessments.grade', 'Grade assessments'),
('enrollments.manage', 'Manage enrollments'),
('analytics.view', 'View analytics'),
('billing.manage', 'Manage billing'),
('forum.moderate', 'Moderate forums'),
('user.self.read', 'Read own profile'),
('system.admin', 'Platform administration'),
('user.sessions.manage', 'Manage user sessions'),
('webhook.manage', 'Manage webhooks');

-- roles
INSERT INTO auth_roles(role_key, description) VALUES
('super_admin','Platform super administrator'),
('support_admin','Platform support admin'),
('dev_admin','Developer/tech admin'),
('org_admin','Organization administrator'),
('instructor','Course instructor'),
('content_creator','Content creator'),
('moderator','Community moderator'),
('teaching_assistant','Teaching assistant'),
('student','Student role'),
('guest','Guest');

-- role -> permission mapping (sample for org_admin)
INSERT INTO auth_role_permissions(role_key, permission_key)
VALUES ('org_admin','org.manage'),
       ('org_admin','org.users.manage'),
       ('org_admin','courses.create'),
       ('org_admin','courses.edit'),
       ('org_admin','courses.publish'),
       ('org_admin','content.upload'),
       ('org_admin','analytics.view'),
       ('org_admin','billing.manage'),
       ('org_admin','forum.moderate');

-- map instructor
INSERT INTO auth_role_permissions(role_key, permission_key)
VALUES ('instructor','courses.create'),
       ('instructor','courses.edit'),
       ('instructor','courses.publish'),
       ('instructor','content.upload'),
       ('instructor','assessments.create'),
       ('instructor','assessments.grade'),
       ('instructor','analytics.view');
```

---

# 5) Access control middleware & examples

Below are concise, production-minded middleware implementations (pseudocode + working patterns). They assume you have user info in the request context after authentication.

## A) Node.js + Express + TypeScript (middleware + helper)

```ts
// types
type User = {
  id: string;
  roles: string[]; // role keys
  orgId?: string | null;
  attrs?: Record<string, any>;
  isPlatformAdmin?: boolean;
};

// Permission checker utility
async function userHasPermission(
  user: User,
  permissionKey: string,
  resourceAttrs?: any,
): Promise<boolean> {
  // 1. Platform admin shortcut
  if (user.isPlatformAdmin) return true;

  // 2. Load user's roles -> cached lookup
  const roles = user.roles || [];

  // 3. RBAC check: resolve role->permission (from cache / Redis / in-memory)
  for (const r of roles) {
    if (await roleHasPermission(r, permissionKey)) return true;
  }

  // 4. ABAC dynamic checks - example policy
  if (permissionKey === 'courses.edit') {
    // allow if user is instructor in same org and owns the course OR org_admin in same org
    if (user.orgId && resourceAttrs?.org_id === user.orgId) {
      if (roles.includes('instructor') && resourceAttrs?.owner_id === user.id) return true;
      if (roles.includes('org_admin')) return true;
    }
  }

  // 5. default deny
  return false;
}

// Express middleware factory
function authorize(permissionKey: string, resourceFn?: (req) => Promise<any>) {
  return async (req, res, next) => {
    const user: User = req.user; // set by auth middleware
    if (!user) return res.status(401).send({ error: 'Unauthenticated' });

    const resource = resourceFn ? await resourceFn(req) : undefined;
    const allowed = await userHasPermission(user, permissionKey, resource);
    if (!allowed) return res.status(403).send({ error: 'Forbidden' });
    next();
  };
}

/*
Usage:
router.post('/courses/:id/publish',
  authorize('courses.publish', async (req) => {
    // fetch course meta for ABAC checks (owner, org_id, state)
    const course = await db.findCourseById(req.params.id);
    return { owner_id: course.owner_id, org_id: course.org_id, draft: course.draft };
  }),
  controller.publishCourse
);
*/
```

**Notes**

- `roleHasPermission` should use a cache (Redis or in-memory LRU) updated on role changes.
- `resourceFn` avoids overfetch by allowing minimal attributes (owner_id, org_id).
- Add request-id tracing and metrics for auth decisions.

---

## B) Go (Gin-style middleware)

```go
// simplified types
type User struct {
  ID string
  Roles []string
  OrgID string
  IsPlatformAdmin bool
  Attrs map[string]interface{}
}

// check function (pseudo)
func UserHasPermission(ctx context.Context, user *User, perm string, resource map[string]interface{}) bool {
  if user == nil { return false }
  if user.IsPlatformAdmin { return true }

  // RBAC: check role->permission (cached)
  for _, r := range user.Roles {
    if RoleHasPermissionCached(r, perm) {
      return true
    }
  }

  // ABAC sample check
  if perm == "courses.edit" {
    if resourceOrg, ok := resource["org_id"].(string); ok && resourceOrg == user.OrgID {
      if contains(user.Roles, "org_admin") { return true }
      if contains(user.Roles, "instructor") {
        if owner, ok := resource["owner_id"].(string); ok && owner == user.ID { return true }
      }
    }
  }

  return false
}

// Gin middleware factory
func Authorize(perm string, loader func(c *gin.Context) map[string]interface{}) gin.HandlerFunc {
  return func(c *gin.Context) {
    user := c.MustGet("user").(*User) // from auth middleware
    resource := map[string]interface{}{}
    if loader != nil { resource = loader(c) }
    if !UserHasPermission(c.Request.Context(), user, perm, resource) {
      c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error":"forbidden"})
      return
    }
    c.Next()
  }
}
```

---

## C) Java (Spring Boot) — annotation + service

**Approach:** Use a custom `@RequiresPermission("permission.key")` annotation that invokes service.

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface RequiresPermission {
    String value();
}

@Component
public class PermissionAspect {
    @Autowired PermissionService permissionService;

    @Around("@annotation(requiresPermission)")
    public Object checkPermission(ProceedingJoinPoint pjp, RequiresPermission requiresPermission) throws Throwable {
        HttpServletRequest req = ... // obtain current request
        UserPrincipal user = (UserPrincipal) req.getAttribute("user");
        Object resource = fetchResourceIfNeeded(req, pjp); // optional
        boolean allowed = permissionService.userHasPermission(user, requiresPermission.value(), resource);
        if (!allowed) throw new AccessDeniedException("Forbidden");
        return pjp.proceed();
    }
}
```

`PermissionService.userHasPermission` implements the RBAC + ABAC logic, using caches and calling policy engine (OPA) for complex rules.

---

# 6) Policy examples (OPA / Rego-like pseudocode)

### Example: publish course policy (Rego-like)

```
package auth

allow_publish {
  input.user.isPlatformAdmin == true
}

allow_publish {
  input.user.org_id == input.resource.org_id
  input.user.roles[_] == "org_admin"
}

allow_publish {
  input.user.org_id == input.resource.org_id
  input.user.roles[_] == "instructor"
  input.resource.owner_id == input.user.id
  input.resource.state == "draft"
  input.user.attrs.verified == true
}
```

Use OPA for complex policies and push compiled bundles to each service or central PDP.

---

# 7) Tenant overrides & dynamic roles

Allow organizations to add custom roles & permission mappings. Store overrides:

```sql
CREATE TABLE tenant_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  role_key TEXT NOT NULL,
  display_name TEXT,
  meta JSONB DEFAULT '{}'
);

CREATE TABLE tenant_role_permissions (
  tenant_role_id UUID REFERENCES tenant_roles(id),
  permission_key TEXT REFERENCES auth_permissions(permission_key),
  PRIMARY KEY(tenant_role_id, permission_key)
);
```

When evaluating permissions: check tenant-specific role mappings first, then fall back to global roles.

---

# 8) Caching & performance patterns

- Cache role→permissions in Redis with TTL and update/evict on role changes.
- Cache user→roles mapping per session (JWT can contain role keys, but still validate against DB on sensitive ops).
- Keep ABAC dynamic checks lightweight: fetch only required attributes (owner_id, org_id, state).
- Use local LRU cache for super-frequent permission checks within request lifecycle.

---

# 9) Audit & security

- Log all authorization failures with context (user_id, endpoint, permission requested, resource id).
- Add `role_assignment_audit` table (schema provided earlier).
- Ensure permission changes require `org_admin` or `super_admin` and are tracked.

---

# 10) Migration & seed scripts (example Node.js seed snippet)

```js
// seedRoles.js (Node)
const { db } = require('./db');

async function seed() {
  // insert permissions from JSON
  const perms = require('./permissions.json').permissions;
  await Promise.all(
    Object.keys(perms).map((k) =>
      db.query(
        'INSERT INTO auth_permissions(permission_key, description) VALUES($1,$2) ON CONFLICT DO NOTHING',
        [k, perms[k]],
      ),
    ),
  );
  // insert roles
  const roles = require('./permissions.json').roles;
  await Promise.all(
    Object.keys(roles).map((r) =>
      db.query(
        'INSERT INTO auth_roles(role_key, description) VALUES($1,$2) ON CONFLICT DO NOTHING',
        [r, r],
      ),
    ),
  );
  // map role perms
  for (const r in roles) {
    for (const p of roles[r]) {
      await db.query(
        'INSERT INTO auth_role_permissions(role_key, permission_key) VALUES($1,$2) ON CONFLICT DO NOTHING',
        [r, p],
      );
    }
  }
}
seed().then(() => process.exit());
```

---

# 11) Tests you should write (unit & integration)

1. RBAC unit tests:
   - roleHasPermission returns true for mapped roles
   - platform admin short-circuits

2. ABAC policy tests:
   - instructor editing own course → allow
   - instructor editing other org course → deny
   - org_admin publishes course → allow even if not owner

3. Integration:
   - `POST /courses/:id/publish` authorized path: verifies middleware blocks unauthorized user.
   - tenant overrides: custom role with custom permission properly applied.

4. Security:
   - expired JWT → deny
   - revoked refresh token → cannot use

---

# 12) Quick reference: How to use in your services

- **Auth service**: issue JWTs that contain `user_id`, `roles` (role keys), `org_id`, and `jti`. Keep JWT small; avoid sensitive attributes in JWT.
- **API Gateway**: verify JWT, fetch minimal user roles if needed, set `x-user-id`, `x-user-roles`, `x-org-id` headers for downstream services. Gateway can short-circuit platform-level checks (e.g., block banned users).
- **Microservices**: trust gateway for authentication, but still validate authorization with local cache & ABAC checks.
- **UI**: hide or disable UI elements based on roles in JWT, but always enforce server-side.

---

If you want, next I can:

- Generate **full SQL migrations** for all tables and a complete seed file from the JSON permission registry, **or**
- Produce an **Express + TypeScript** example repo skeleton implementing the auth+RBAC middleware + endpoints for courses and content upload, **or**
- Produce **OPA policies** for the most common operations (publish, edit, upload) and an integration example.

Which of those should I generate for you now?

Understood.
Right now your website only shows **Student Registration**, but you want a way to **register ALL member types**:

- **Organization Admin**
- **Instructor**
- **Content Creator**
- **Moderator**
- **Teaching Assistant**
- **Student**
- (Optional) custom roles per organization

To achieve this, you must follow the **correct multi-tenant onboarding model**.

Below is the correct system-architecture way to handle **role-based onboarding** on a large LMS platform like SkillHub Pro.

---

# ✅ **FIRST RULE:**

**You should NEVER allow Instructor, Admin, Moderator, or TA to self-register like Students.**

Why?

Because:

- You don’t want random people creating fake orgs.
- Instructors must be invited by an Org Admin.
- Moderators/Creators/TA require approval.
- Security & trust issues.

So your system will have **three types of registration flows**:

---

# 🔵 **1) Public Registration (Students only)**

This is what the website shows publicly.

✔ Anyone can sign up
✔ Role = **student** by default
✔ No organization assigned
✔ Can enroll in public courses or purchase courses
✔ Can join an organization ONLY if invited

**API flow:**

```
POST /api/v1/auth/register
role = "student"
org_id = null
```

---

# 🟣 **2) Organization Admin Registration (Org Creation Flow)**

This is **NOT public**.

Only two ways to create an Organization Admin:

### **A. Super Admin creates new organization**

Use Admin dashboard:

```
POST /api/v1/admin/organizations
- org details
- admin email
```

System automatically creates 1 user with role = `org_admin`.

### **B. “Create Organization” page (Invite-only or Approval-based)**

If your platform allows companies/schools to sign up:

Flow:

1. User fills “Create Organization” form
2. System creates _pending organization_
3. Super Admin approves
4. Role = `org_admin`

**API flow:**

```
POST /api/v1/organizations/register
status = "pending"
role = org_admin
Requires approval
```

**NEVER allow auto-activation without approval** (security risk).

---

# 🟡 **3) Internal Organization Role Registration (Invitation System)**

Here is how other roles are created:

### ✔ Only **Organization Admin** can invite:

- Instructor
- Content Creator
- Moderator
- Teaching Assistant

### Flow:

1. Org Admin opens “Manage Members” page
2. Enters email + chooses role
3. System sends invitation link
4. User clicks link → creates password → joins org

**API flow:**

```
POST /api/v1/organizations/{org_id}/invite
{
   "email": "abc@example.com",
   "role_key": "instructor"
}
```

User completes:

```
POST /api/v1/auth/accept-invite
```

Now user belongs to that org with that role.

---

# 🔥 **SO YOUR REGISTRATION SYSTEM MUST SUPPORT THESE THREE FLOWS**

| User Type              | How They Register?                            | Who Approves? |
| ---------------------- | --------------------------------------------- | ------------- |
| **Student**            | Self-register on public website               | No approval   |
| **Organization Admin** | Approved by Super Admin or “Request Org” flow | Super Admin   |
| **Instructor**         | Invited by Org Admin                          | Org Admin     |
| **Content Creator**    | Invited by Org Admin                          | Org Admin     |
| **Moderator**          | Invited by Org Admin                          | Org Admin     |
| **Teaching Assistant** | Invited by Instructor / Org Admin             | Org Admin     |
| **Super Admin**        | Manually created in DB                        | Developer     |

---

# 🧩 Why this is the correct architecture?

1. **Security** – Prevents random people from registering as instructor/admin.
2. **Multi-tenancy** – Each organization manages its own users.
3. **Scalability** – Invitation-based onboarding is industry-standard.
4. **Roles become manageable** – Org Admin assigns roles safely.
5. **Prevent fraud** – No random “org admin” creation.

---

# 🚀 **IMPLEMENTATION DETAILS (what you must build)**

## 1) Public Registration Page

- `/signup`
- Only "email + password + name"
- Role = student

## 2) Organization Request Page

- `/create-organization`
- Requires company email + details
- Super Admin approves it

## 3) Organization Admin Dashboard

Inside org dashboard:

- `/dashboard/members`
- Invite user: email + role dropdown
- Shows list of members with roles
- Can remove / change role

## 4) Invitation System

Invitation table:

```
invitations:
- id
- org_id
- email
- role_key
- status (pending/accepted/expired)
- token
```

---

# 🧨 Example: Full Registration Routing

### 🌐 Public Website

| Route      | Action                |
| ---------- | --------------------- |
| `/signup`  | Student signup        |
| `/login`   | Login                 |
| `/courses` | Browse public courses |

### 🏢 Admin (Platform)

| Route          | Action               |
| -------------- | -------------------- |
| `/admin/orgs`  | Create organization  |
| `/admin/users` | Create support admin |

### 🏫 Organization Dashboard

| Route                | Action                                 |
| -------------------- | -------------------------------------- |
| `/org/members`       | Invite Instructor/Creator/TA/Moderator |
| `/org/invite/:token` | Accept invitation                      |

---

# 🎯 FINAL ANSWER SHORT

**Students register directly.
All other members join only through invitations or admin approval.**

This is the correct enterprise-level flow.

---

If you want, I can now generate:

### ✔ Complete registration flow diagrams

### ✔ Backend APIs for all registration types

### ✔ Invitation service (Node.js + SQL)

### ✔ UI pages for signup, invite, org creation

### ✔ Database schema for invitations + roles

Just tell me:

**“Give me registration APIs”** or
**“Give me the database schema”** or
**“Give me full flow diagram”**
