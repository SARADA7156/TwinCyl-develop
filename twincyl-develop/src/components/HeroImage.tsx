import Image from "next/image";

export default function HeroImage() {
    return (
        <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/twinCyl_hero_image.webp`}
            alt="TwinCylStudio Hero image"
            width={2560}
            height={700}
            quality={90}
            priority
            className="h-auto w-screen mt-[60]"
            loading="eager"
        />
    );
}
