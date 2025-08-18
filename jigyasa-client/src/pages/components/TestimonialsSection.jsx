import { useTranslation } from 'react-i18next';

export default function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = [
    {
      quote: t('testimonial_1_quote'),
      name: t('testimonial_1_name'),
      role: t('testimonial_1_role'),
    },
    {
      quote: t('testimonial_2_quote'),
      name: t('testimonial_2_name'),
      role: t('testimonial_2_role'),
    },
    {
      quote: t('testimonial_3_quote'),
      name: t('testimonial_3_name'),
      role: t('testimonial_3_role'),
    },
  ];

  return (
    <section className="px-6 py-12">
      <h3 className="text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-white">
        {t('testimonials_heading')}
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((tData, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
          >
            <p className="italic mb-4 text-gray-700 dark:text-gray-300">“{tData.quote}”</p>
            <h4 className="font-semibold text-gray-900 dark:text-white">{tData.name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">{tData.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
