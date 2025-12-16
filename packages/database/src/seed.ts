import './env.js'
import { db } from './client.js'
import { users, posts, comments } from './schema.js'

async function seed() {
  console.log('Starting database seed...')

  const createdUsers = await db
    .insert(users)
    .values([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
      },
      {
        name: 'Charlie Davis',
        email: 'charlie@example.com',
      },
    ])
    .returning()

  console.log(`✓ Created ${createdUsers.length} users`)

  const createdPosts = await db
    .insert(posts)
    .values([
      {
        title: 'Getting Started with Drizzle ORM',
        content: 'Drizzle ORM is a lightweight and performant TypeScript ORM that makes database operations type-safe and intuitive.',
        authorId: createdUsers[0].id,
      },
      {
        title: 'Building Scalable APIs with Fastify',
        content: 'Learn how to build high-performance APIs using Fastify and TypeScript with proper architecture patterns.',
        authorId: createdUsers[0].id,
      },
      {
        title: 'PostgreSQL Best Practices',
        content: 'Discover best practices for working with PostgreSQL including indexing, query optimization, and connection pooling.',
        authorId: createdUsers[1].id,
      },
      {
        title: 'TypeScript Tips and Tricks',
        content: 'Advanced TypeScript patterns and techniques to write better, more maintainable code.',
        authorId: createdUsers[2].id,
      },
    ])
    .returning()

  console.log(`✓ Created ${createdPosts.length} posts`)

  const createdComments = await db
    .insert(comments)
    .values([
      {
        content: 'Great article! Very helpful for beginners.',
        postId: createdPosts[0].id,
        authorId: createdUsers[1].id,
      },
      {
        content: 'Thanks for sharing this. Looking forward to more content.',
        postId: createdPosts[0].id,
        authorId: createdUsers[2].id,
      },
      {
        content: 'Fastify is amazing! The performance is incredible.',
        postId: createdPosts[1].id,
        authorId: createdUsers[2].id,
      },
      {
        content: 'These tips really improved my query performance.',
        postId: createdPosts[2].id,
        authorId: createdUsers[0].id,
      },
      {
        content: 'Connection pooling made a huge difference in my app!',
        postId: createdPosts[2].id,
        authorId: createdUsers[2].id,
      },
      {
        content: 'This is exactly what I needed. Thank you!',
        postId: createdPosts[3].id,
        authorId: createdUsers[1].id,
      },
    ])
    .returning()

  console.log(`✓ Created ${createdComments.length} comments`)

  console.log('\n✅ Database seed completed successfully!')
  console.log('\nCreated:')
  console.log(`  - ${createdUsers.length} users`)
  console.log(`  - ${createdPosts.length} posts`)
  console.log(`  - ${createdComments.length} comments`)

  process.exit(0)
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error)
  process.exit(1)
})
