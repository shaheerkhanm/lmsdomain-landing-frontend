import React from 'react'

function PricingBanner() {
  return (
    <div className='absolute top-0 left-0 -z-1 font-manrope 2xl:h-[90vh] xl:h-[80vh] lg:h-[50vh] h-[100vh] bg-gradient-to-b from-[#6C4BFF] to-[#6C4BFF20] w-full flex flex-col items-center justify-center gap-5'>
      <div className="img-div">
        <img src="assets/img/svg/pricing-grid-bg.svg" alt="" className='absolute left-1/2 top-1/2 -translate-1/2 z-0' />
        <img src="assets/img/svg/pricing-banner-card-img.svg" alt="" className='md:block hidden absolute left-0 bottom-0' />
        <img src="assets/img/svg/pricing-banner-card-img.svg" alt="" className='md:block hidden absolute right-0 bottom-0 -scale-x-100' />
      </div>
    </div>
  )
}

export default PricingBanner