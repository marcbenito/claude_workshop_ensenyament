import type { Professor } from "@/lib/types";

/**
 * Lista de profesores "hardcodeada en la BD".
 *
 * En el sistema real esto vendría de una tabla `professors` de Supabase.
 * Para el prototipo se considera que TODOS están siempre disponibles en
 * cualquier franja horaria.
 */
export const PROFESSORS: Professor[] = [
  {
    id: "prof-1",
    name: "Ana Martín",
    subject: "Frontend & React",
    initials: "AM",
    bio: "Especialista en interfaces accesibles y design systems.",
  },
  {
    id: "prof-2",
    name: "Bruno Sáez",
    subject: "Backend & APIs",
    initials: "BS",
    bio: "Arquitectura de servicios, Node.js y bases de datos.",
  },
  {
    id: "prof-3",
    name: "Carla Ferrer",
    subject: "Producto & UX",
    initials: "CF",
    bio: "Investigación de usuario y diseño de producto.",
  },
  {
    id: "prof-4",
    name: "David Ortega",
    subject: "DevOps & Cloud",
    initials: "DO",
    bio: "CI/CD, contenedores e infraestructura como código.",
  },
  {
    id: "prof-5",
    name: "Elena Ruiz",
    subject: "Data & IA",
    initials: "ER",
    bio: "Modelos de datos, analítica y machine learning aplicado.",
  },
];

export function getProfessorById(id: string): Professor | undefined {
  return PROFESSORS.find((p) => p.id === id);
}
