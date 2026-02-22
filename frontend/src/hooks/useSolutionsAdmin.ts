import { useState, useEffect } from 'react';
import { solutionsData as initialSolutions, Solution } from '../data/solutions';

export const useSolutionsAdmin = () => {
    const [solutions, setSolutions] = useState<Solution[]>([]);

    // Initialize from local storage or fallback to static data
    useEffect(() => {
        const saved = localStorage.getItem('aids_solutions_data');
        if (saved) {
            setSolutions(JSON.parse(saved));
        } else {
            setSolutions(initialSolutions);
            localStorage.setItem('aids_solutions_data', JSON.stringify(initialSolutions));
        }
    }, []);

    const addSolution = (newItem: Omit<Solution, 'id'>) => {
        const solution: Solution = {
            ...newItem,
            id: `sol-${Date.now()}`
        };
        const updated = [solution, ...solutions];
        setSolutions(updated);
        localStorage.setItem('aids_solutions_data', JSON.stringify(updated));
    };

    const updateSolution = (id: string, updatedData: Partial<Solution>) => {
        const updated = solutions.map(item =>
            item.id === id ? { ...item, ...updatedData } : item
        );
        setSolutions(updated);
        localStorage.setItem('aids_solutions_data', JSON.stringify(updated));
    };

    const deleteSolution = (id: string) => {
        if (window.confirm('¿Estás seguro que querés eliminar esta solución?')) {
            const updated = solutions.filter(item => item.id !== id);
            setSolutions(updated);
            localStorage.setItem('aids_solutions_data', JSON.stringify(updated));
        }
    };

    return { solutions, addSolution, updateSolution, deleteSolution };
};
