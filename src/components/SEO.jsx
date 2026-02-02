import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords }) => {
    const siteTitle = "الصيدلية البيطرية | Vet Pharmacy";
    const defaultDescription = "نظام متطور لإدارة الصيدلية البيطرية، تتبع المخزون، إدارة المنتجات، وتنبيهات تاريخ الانتهاء.";
    const defaultKeywords = "صيدلية بيطرية, إدارة صيدلية, مخزون بيطري, أدوية بيطرية, Vet Pharmacy, Management System";

    return (
        <Helmet>
            <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || siteTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
        </Helmet>
    );
};

export default SEO;
