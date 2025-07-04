import { RiReactjsLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { SiMongodb } from "react-icons/si";
import { DiFirefox } from "react-icons/di";
import {FaNodeJs } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { animate, motion } from "framer-motion"
const icon=(x)=>({
    initial:{y:-10},
    animate:{
        y:[15,-10],
        transition:{
            duration:x,
            ease:"linear",
            repeat: Infinity,
            repeatType:"reverse",
        }
    },
})
const Technologies = () => {
    return (
        <div className="border-b border-neutral-900 pb-24">
            <motion.h2 whileInView={{opacity:1,x:0}} initial={{opacity:0,x:-100}} transition={{duration:1.5}}
             className="my-20 text-center text-4xl">Technologies</motion.h2>
            <motion.div whileInView={{opacity:1,x:0}} initial={{opacity:0,x:-100}} transition={{duration:1.5}}  className="flex flex-wrap items-center justify-center gap-4">
                <motion.div variants={icon(2.5)} initial="initial" animate="animate"   className="rounded-2xl border-4 border-neutral-800 p-4">
                    <RiReactjsLine className="text-7xl text-cyan-400"/>
                </motion.div>
                <motion.div variants={icon(3)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4">
                    <TbBrandNextjs className="text-7xl text-cyan-400"/>
                </motion.div>
                <motion.div variants={icon(3.5)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4">
                    <SiMongodb className="text-7xl text-green-500"/>
                </motion.div>
                <motion.div variants={icon(4)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4">
                    <DiFirefox className="text-7xl text-cyan-400"/>
                </motion.div>
                <motion.div variants={icon(4.5)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4">
                    <FaNodeJs className="text-7xl text-cyan-400"/>
                </motion.div>
                <motion.div variants={icon(5)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4">
                    <BiLogoPostgresql className="text-7xl text-cyan-400"/>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Technologies;