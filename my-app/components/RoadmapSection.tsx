'use client'

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface MilestoneProps {
    year: string;
    title: string;
    description: string;
    isLeft: boolean;
    isPast: boolean;
}

const Milestone: React.FC<MilestoneProps> = ({ year, title, description, isLeft, isPast }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`flex ${isLeft ? 'flex-row-reverse' : 'flex-row'} items-center mb-8`}
        >
            <div className={`w-5/12 ${isLeft ? 'text-right' : 'text-left'}`}>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-400">{description}</p>
            </div>
            <div className="w-2/12 flex justify-center">
                <div className="w-4 h-4 bg-purple-500 rounded-full relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-purple-500 bg-opacity-30 rounded-full"></div>
                </div>
            </div>
            <div className={`w-5/12 ${isLeft ? 'text-left' : 'text-right'}`}>
                <span className={`text-lg font-semibold ${isPast ? 'text-green-400' : 'text-yellow-400'}`}>{year}</span>
            </div>
        </motion.div>
    );
};

export default function RoadmapSection() {
    const milestones = [
        { year: '2024 August', title: 'Champion of XUEDAO Hackathon', description: 'Successfully our first time hackathon', isPast: true },
        { year: '2024 November', title: 'Champion of Code  Collection(Taipei)', description: 'Reached our brand name and attracts additional investors.', isPast: true },
        { year: '2025 Q1', title: 'Finish smart contract audit', description: 'Implementing the safety of user funding', isPast: false },
        { year: '2025 Q2', title: 'Launch Testnet', description: 'Enhance user experience and address bugs in our program.', isPast: false },
        { year: '2025 Q3', title: 'Launch Mainnet', description: 'Seize the market share of gamble on aptos.', isPast: false },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Our Roadmap
            </h2>
            <div className="relative w-full max-w-4xl">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700"></div>
                {milestones.map((milestone, index) => (
                    <Milestone
                        key={index}
                        year={milestone.year}
                        title={milestone.title}
                        description={milestone.description}
                        isLeft={index % 2 === 0}
                        isPast={milestone.isPast}
                    />
                ))}
            </div>
        </div>
    );
}

