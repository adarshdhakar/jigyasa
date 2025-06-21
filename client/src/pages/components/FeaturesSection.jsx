import { useTranslation } from 'react-i18next';

export default function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    { key: 'User Experience' },
    { key: 'Volunteer Management' },
    { key: 'School Assignment System' },
    { key: 'Educational Resources' },
    { key: 'Admin Controls' },
    { key: 'School Management' },
    { key: 'Scheduling System' },
    { key: 'Analytics Dashboard' }
  ];

  return (
    <section className="px-6 py-12">
      <h3 className="text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-white">
        {t('features_heading')}
      </h3>
      <div className="grid md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-sm p-6 text-center transition-colors"
          >
            <h4 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">
              {t(`features.${feature.key}`)}
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t(`features.${feature.key}_desc`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
