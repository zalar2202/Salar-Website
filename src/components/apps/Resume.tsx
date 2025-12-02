import React from 'react';

const Resume: React.FC = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Tahoma, sans-serif', maxHeight: '100%', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '15px', borderBottom: '2px solid #0054a6', paddingBottom: '5px' }}>Salar Safayi</h2>

            <section style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#0054a6', marginBottom: '8px' }}>Full-Stack Developer & DevOps Engineer</h3>
                <p style={{ marginBottom: '5px' }}><strong>Email:</strong> salar@example.com</p>
                <p style={{ marginBottom: '5px' }}><strong>Location:</strong> Available Worldwide</p>
                <p style={{ marginBottom: '5px' }}><strong>GitHub:</strong> github.com/salar</p>
            </section>

            <section style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#0054a6', marginBottom: '8px' }}>Professional Summary</h3>
                <p>Passionate full-stack developer with expertise in modern web technologies, cloud infrastructure, and AI integration. Specialized in building scalable applications with React, Next.js, and Node.js. Strong background in DevOps practices, containerization, and CI/CD pipelines.</p>
            </section>

            <section style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#0054a6', marginBottom: '8px' }}>Technical Skills</h3>
                <p><strong>Frontend:</strong> React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Vite</p>
                <p><strong>Backend:</strong> Node.js, Express, REST APIs, GraphQL</p>
                <p><strong>DevOps:</strong> Docker, Kubernetes, CI/CD, GitHub Actions, Jenkins</p>
                <p><strong>Cloud:</strong> AWS, Azure, Google Cloud Platform</p>
                <p><strong>Databases:</strong> MongoDB, PostgreSQL, MySQL, Redis</p>
                <p><strong>AI/ML:</strong> OpenAI API, LangChain, AI-powered automation</p>
                <p><strong>Tools:</strong> Git, VS Code, Webpack, npm, yarn</p>
            </section>

            <section style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#0054a6', marginBottom: '8px' }}>Professional Experience</h3>

                <div style={{ marginBottom: '15px' }}>
                    <h4 style={{ marginBottom: '5px' }}>Senior Full-Stack Developer</h4>
                    <p style={{ fontStyle: 'italic', marginBottom: '5px' }}>Tech Company | 2021 - Present</p>
                    <ul>
                        <li>Architected and developed scalable web applications using React and Next.js</li>
                        <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
                        <li>Led migration to microservices architecture using Docker and Kubernetes</li>
                        <li>Integrated AI capabilities to enhance user experience and automation</li>
                    </ul>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <h4 style={{ marginBottom: '5px' }}>Full-Stack Developer</h4>
                    <p style={{ fontStyle: 'italic', marginBottom: '5px' }}>Startup Inc. | 2019 - 2021</p>
                    <ul>
                        <li>Built responsive web applications with React and Node.js</li>
                        <li>Developed RESTful APIs serving 100K+ daily requests</li>
                        <li>Optimized database queries improving performance by 40%</li>
                        <li>Collaborated with cross-functional teams in Agile environment</li>
                    </ul>
                </div>
            </section>

            <section style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#0054a6', marginBottom: '8px' }}>Education</h3>
                <p><strong>Bachelor of Science in Computer Science</strong></p>
                <p style={{ fontStyle: 'italic' }}>University Name | 2015 - 2019</p>
            </section>

            <section style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#0054a6', marginBottom: '8px' }}>Projects & Achievements</h3>
                <ul>
                    <li>Created Windows XP-style portfolio website showcasing nostalgic UI design</li>
                    <li>Developed open-source tools with 1000+ GitHub stars</li>
                    <li>Contributed to major open-source projects in the React ecosystem</li>
                    <li>Speaker at local tech meetups on modern web development practices</li>
                </ul>
            </section>
        </div>
    );
};

export default Resume;
