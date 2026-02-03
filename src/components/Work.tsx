import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink } from 'lucide-react';

export function Work() {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform Redesign",
      description: "Complete redesign of a fashion e-commerce platform focusing on user experience and conversion optimization.",
      image: "https://images.unsplash.com/photo-1630522790858-50b4ef44944b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc1Nzc5Mjc1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["UI/UX", "E-commerce", "Web Design"],
      year: "2024"
    },
    {
      id: 2,
      title: "Brand Identity System",
      description: "Comprehensive brand identity design for a sustainable lifestyle brand, including logo, colors, and brand guidelines.",
      image: "https://images.unsplash.com/photo-1659141170537-6e0aa70329a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMGlkZW50aXR5JTIwZGVzaWduJTIwcHJvamVjdHxlbnwxfHx8fDE3NTc4NzQ3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Branding", "Identity", "Print"],
      year: "2023"
    },
    {
      id: 3,
      title: "Mobile Banking App",
      description: "Design of a modern mobile banking application with focus on security, usability, and financial wellness features.",
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3ODI1NTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      tags: ["Mobile", "Fintech", "UX"],
      year: "2023"
    }
  ];

  return (
    <section id="work" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Selected Work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my approach to solving 
            design challenges through thoughtful user experience and visual design.
          </p>
        </div>

        <div className="grid gap-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative overflow-hidden rounded-lg bg-muted">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ExternalLink className="text-white" size={24} />
                  </div>
                </div>
              </div>
              
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{project.year}</span>
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs bg-muted rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-medium mb-4">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group/link">
                  View Project
                  <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}