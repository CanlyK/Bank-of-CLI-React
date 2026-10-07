import MuiSkeleton, { type SkeletonProps } from "@mui/material/Skeleton";

const themedSx = {
    bgcolor: "var(--color-border)",
    "&::after": {
        background: "linear-gradient(90deg, transparent, var(--color-surface-hover), transparent)",
    },
};

export default function Skeleton({ sx, ...props }: SkeletonProps) {
    return <MuiSkeleton {...props} animation="wave" sx={[themedSx, ...(Array.isArray(sx) ? sx : [sx])]} />;
}
