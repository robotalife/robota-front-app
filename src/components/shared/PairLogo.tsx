import { ImgHTMLAttributes } from "react";
import classes from './PairLogo.module.scss';


const PairLogo = ({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
    return <div className={`${classes.pairLogo} ${className}`}>
        <img {...props} />;
    </div>
};

export default PairLogo;
