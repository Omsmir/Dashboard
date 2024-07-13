import { motion } from "framer-motion";


const MotionComponent = ({componet,id,className,p}) => {
    const visible = { opacity: 1, scale: 1, transition: { duration: 0.6 } };

    return ( 
        <motion.section className={`${className} pt-5`} id={id}  initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}>
          <motion.div className={`structure position-relative ${p}`}  variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible,
                      }}>

{componet}
</motion.div>
</motion.section>
     );
}
 
export default MotionComponent;