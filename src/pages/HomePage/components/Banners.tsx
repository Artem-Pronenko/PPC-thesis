import React, {FC} from 'react'

interface BannersProps {
  test: string
  label: string
}

const Banners: FC<BannersProps> = ({test, label}) => {
  return (
    <div className="banner test-info home__banner">
      <span className="test-info__number">{test}</span>
      <h4 className="test-info__title">{label}</h4>
    </div>
  )
}

export default Banners;