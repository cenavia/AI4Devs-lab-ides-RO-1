const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create default users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@ats.com' },
    update: {},
    create: {
      id: 'admin-user-id',
      email: 'admin@ats.com',
      name: 'Admin User',
    },
  });

  const hrUser = await prisma.user.upsert({
    where: { email: 'hr@ats.com' },
    update: {},
    create: {
      id: 'hr-user-id',
      email: 'hr@ats.com',
      name: 'HR Manager',
    },
  });

  console.log('Created users:', { adminUser, hrUser });

  // Create sample candidates
  const candidate1 = await prisma.candidate.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      id: 'candidate-1-id',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-0123',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        zipCode: '10001',
      },
      educations: [
        {
          id: 'edu-1',
          institution: 'University of Technology',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          startDate: new Date('2018-09-01'),
          endDate: new Date('2022-06-01'),
          isCurrent: false,
        },
      ],
      workExperiences: [
        {
          id: 'exp-1',
          company: 'Tech Corp',
          position: 'Software Developer',
          description: 'Developed web applications using React and Node.js',
          startDate: new Date('2022-07-01'),
          endDate: new Date('2024-01-01'),
          isCurrent: false,
        },
      ],
      skills: [
        {
          id: 'skill-1',
          name: 'JavaScript',
          level: 'ADVANCED',
          category: 'Programming',
        },
        {
          id: 'skill-2',
          name: 'React',
          level: 'INTERMEDIATE',
          category: 'Frontend',
        },
      ],
      notes: 'Promising candidate with good technical skills',
      status: 'ACTIVE',
      createdById: adminUser.id,
    },
  });

  const candidate2 = await prisma.candidate.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      id: 'candidate-2-id',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+1-555-0456',
      address: {
        street: '456 Oak Ave',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        zipCode: '94102',
      },
      educations: [
        {
          id: 'edu-2',
          institution: 'Design Institute',
          degree: 'Master of Arts',
          fieldOfStudy: 'UX Design',
          startDate: new Date('2019-09-01'),
          endDate: new Date('2021-06-01'),
          isCurrent: false,
        },
      ],
      workExperiences: [
        {
          id: 'exp-2',
          company: 'Creative Agency',
          position: 'UX Designer',
          description:
            'Designed user interfaces for mobile and web applications',
          startDate: new Date('2021-08-01'),
          isCurrent: true,
        },
      ],
      skills: [
        {
          id: 'skill-3',
          name: 'Figma',
          level: 'EXPERT',
          category: 'Design',
        },
        {
          id: 'skill-4',
          name: 'User Research',
          level: 'ADVANCED',
          category: 'Research',
        },
      ],
      notes: 'Excellent design portfolio and user research experience',
      status: 'ACTIVE',
      createdById: hrUser.id,
    },
  });

  console.log('Created candidates:', { candidate1, candidate2 });

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
