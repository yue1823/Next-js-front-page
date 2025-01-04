'use client'

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface StatItemProps {
    number: number;
    description: string;
    delay: number;
}

const StatItem = ({ number, description, delay }: StatItemProps) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay }}
            className="text-center"
        >
            <motion.div
                className="text-5xl md:text-7xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: delay + 0.2 }}
            >
                {inView ? number.toLocaleString() : '0'}
            </motion.div>
            <p className="text-gray-300 text-lg md:text-xl max-w-xs mx-auto">
                {description}
            </p>
        </motion.div>
    );
};

export default function StatsSection() {
    const stats = [
        {
            number: 10,
            description: "Years in the business trying to build this business from the ground up.",
        },
        {
            number: 100,
            description: "People Fought trying to establish our brand.",
        },
        {
            number: 25724,
            description: "Fight Club Attendance so that everyone knows the first rule.",
        },
        {
            number: 69420,
            description: "People trying to get access but guess what? they can't.",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
            <div className="max-w-7xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl md:text-6xl font-bold mb-6"
                >
                    Trusted by fighters all over the world
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto"
                >
                    We are a team of experienced fighters and boxers who are passionate about helping you grow your business.
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={index}
                            number={stat.number}
                            description={stat.description}
                            delay={0.3 + index * 0.2}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
