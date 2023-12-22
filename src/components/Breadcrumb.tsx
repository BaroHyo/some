import React from 'react'
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { IoEllipseSharp } from 'react-icons/io5';


interface Link {
    name?: string;
    href?: string;
    icon?: React.ReactNode;
}


export const CustomBreadcrumbs: React.FC<{ className?: string; heading?: string | undefined, action?: React.ReactNode; links?: Link[] }> = ({ heading, links = [], action, className }) => {

    return (
        <div className={cn(
            className
        )}>
            <div className="flex items-center">
                <div className="flex-grow">
                    {heading && (
                        <h4 className="text-2xl mb-4 font-bold">
                            {heading}
                        </h4>
                    )}
                    {!!links.length && (
                        <div className="flex items-center space-x-2 text-gray-500 text-sm">
                            {
                                links.map((link, index) => (
                                    <>
                                        <LinkItem
                                            key={`${link.name}-${index}`}
                                            link={link}
                                        />
                                        {index < links.length - 1 && <div className="mx-2"><IoEllipseSharp size={6} /></div>}
                                    </>
                                ))
                            }
                        </div>
                    )}
                </div>
                {action && (<div className="flex-shrink-0">
                    {action}
                </div>)}
            </div>
        </div>
    )
}


const LinkItem: React.FC<{ link: Link }> = ({ link }) => {

    const { name, href, icon } = link;

    const renderContent = (
        <>
            {icon && (
                <span className="mr-1 inline">
                    {icon}
                </span>
            )}
            {name}
        </>
    )

    if (href) {
        return (
            <Link href={href} className="font-medium text-gray-700 hover:text-blue-500">
                {renderContent}
            </Link>
        )
    }

    return (
        <span className="text-gray-800 font-semibold">{renderContent}</span>
    )
}