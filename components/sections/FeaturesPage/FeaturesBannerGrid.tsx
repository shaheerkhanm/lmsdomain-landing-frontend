import React from 'react'

function FeaturesBannerGrid() {
    return (
        <div className='lg:grid hidden grid-cols-3 gap-[20px]'>
            <div className="col-span-1">
                <div className="img-div p-[20px] bg-white rounded-[15px]">
                    <img src="assets/img/advantage/advantage-img-1.jpg" alt="" className='rounded-[10px] lg:h-[300px] h-[150px] w-full object-cover' />
                </div>
            </div>
            <div className="col-span-1">
                <div className="img-div p-[20px] bg-white rounded-[15px]">
                    <img src="assets/img/advantage/advantage-img-2.jpg" alt="" className='rounded-[10px] lg:h-[300px] h-[150px] w-full object-cover' />
                </div>
            </div>
            <div className="col-span-1">
                <div className="img-div p-[20px] bg-white rounded-[15px]">
                    <img src="assets/img/advantage/advantage-img-3.jpg" alt="" className='rounded-[10px] lg:h-[300px] h-[150px] w-full object-cover' />
                </div>
            </div>
        </div>
    )
}

export default FeaturesBannerGrid