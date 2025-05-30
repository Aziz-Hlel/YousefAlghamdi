import apiGateway from '@src/utils/apiGateway';
import { useEffect, useRef, useState } from 'react';
import Http from '@src/services/Http';
import { Sponsor } from '../Dashboard2/SponsorsEdit/Sponsors.provider';
import { useTranslation } from 'react-i18next';
import getText from '@src/i18n/data/getText';
import { capitalizePhrase } from '@src/utils/capitalize_decapitalized';



const Sponsors = () => {
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);


    const fetchSponsors = async () => {
        const response = await Http.get(apiGateway.sponsor.getAll)
        response?.status === 200 && setSponsors(response.data.result);
        response?.status !== 200 && console.error("Error fetching sponsors");
    }

    useEffect(() => {
        fetchSponsors()
    }, [])

    const scrollerRef = useRef<HTMLDivElement>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        if (!scrollerRef.current) return;

        const scroller = scrollerRef.current;
        let animationFrameId: number;
        let speed = 1; // pixels per frame
        let position = 0;
        const maxPosition = scroller.scrollWidth / 2;

        const animate = () => {
            position += speed;

            // Reset position when half way to create infinite loop
            if (position >= maxPosition) {
                position = 0;
            }

            scroller.scrollLeft = position;
            setScrollPosition(position);
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        // Pause on hover
        const handleMouseEnter = () => {
            speed = 0;
        };

        const handleMouseLeave = () => {
            speed = 1;
        };

        scroller.addEventListener('mouseenter', handleMouseEnter);
        scroller.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrameId);
            scroller.removeEventListener('mouseenter', handleMouseEnter);
            scroller.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [sponsors]);

    const displaySponsors = sponsors;
    const { t } = useTranslation(['home', 'common']);

    return (
        <div className="py-10 sm:px-4 bg-gray-50">
            <section className="py-12 sm:px-20 bg-gray-50 w-full">
                <div className="px-4">
                    <div className="sm:text-3xl text-2xl font-bold text-center mb-8"> {capitalizePhrase(t(getText.home.Sponsors.title))}</div>

                    <div
                        ref={scrollerRef}
                        className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_20px,_black_calc(100%-20px),transparent_100%)]"// * 20px kent 128px
                    >
                        <div className="flex items-center justify-center md:justify-start gap-8">
                            {/* First set of sponsors */}
                            {displaySponsors.map(sponsor => (
                                <a
                                    href={sponsor.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={sponsor._id}
                                    className="relative rounded-lg px-4 py-2 flex items-center justify-center  h-[100px] flex-shrink-0"

                                >
                                    <img
                                        src={sponsor.image.url}
                                        alt={sponsor.name}
                                        className="max-w-[100px] max-h-[80px] object-contain"
                                        title={sponsor.name}
                                    />
                                </a>
                            ))}
                            {/* Duplicate for seamless looping */}
                            {displaySponsors.map(sponsor => (

                                <a
                                    href={sponsor.url}
                                    key={`duplicate-${sponsor._id}`}
                                    className="relative rounded-lg px-4 py-2 flex items-center justify-center  h-[100px] flex-shrink-0"
                                >
                                    <img
                                        src={sponsor.image.url}
                                        alt={sponsor.name}
                                        className="max-w-[100px] max-h-[80px] object-contain"
                                        title={sponsor.name}
                                    />
                                </a>


                            ))}

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Sponsors;