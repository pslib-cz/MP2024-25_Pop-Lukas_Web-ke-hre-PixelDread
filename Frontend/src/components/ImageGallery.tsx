import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import styles from './ImageGallery.module.css'; // Import modulu
import 'swiper/css';
import 'swiper/css/pagination';

export default function ImageGallery() {
  return (
    <div className={styles.container}>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          renderBullet: (index, className) =>
            `<span class="${className}">${index + 1}</span>`,
        }}
        modules={[Pagination, Autoplay]}
        style={{ width: '100%', height: 'auto' }}
      >
        <SwiperSlide>
          <img
            src="/pixeldreadimageexample.png"
            alt="Image 1"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/pixeldreadimageexample.png"
            alt="Image 2"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/pixeldreadimageexample.png"
            alt="Image 3"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/pixeldreadimageexample.png"
            alt="Image 4"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </SwiperSlide>
      </Swiper>

      <div className="custom-pagination"></div>
    </div>
  );
}
