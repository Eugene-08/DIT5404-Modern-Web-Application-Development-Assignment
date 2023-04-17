import * as React from 'react';
import { StyledCard } from "./Card";

export function Banner(props) {
    const { items, speed = 5000, handleOpenEdit, ...common } = props;

    return (
        <div className="inner">
            <div className="wrapper">
                <section style={{ "--speed": `${speed}ms` }}>
                    {items.map((item, index) => (
                        <div key={index}>
                            <StyledCard label={item.title} text={item.details.description} image={item.details.image} imageType={item.details.imageType} rating={item.rating} />
                        </div>
                    ))}
                </section>
                <section style={{ "--speed": `${speed}ms` }}>
                    {items.map((item, index) => (
                        <div key={index}>
                            <StyledCard label={item.title} text={item.details.description} image={item.details.image} imageType={item.details.imageType} rating={item.rating} />
                        </div>
                    ))}
                </section>
                <section style={{ "--speed": `${speed}ms` }}>
                    {items.map((item, index) => (
                        <div key={index}>
                            <StyledCard label={item.title} text={item.details.description} image={item.details.image} imageType={item.details.imageType} rating={item.rating} />
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};
