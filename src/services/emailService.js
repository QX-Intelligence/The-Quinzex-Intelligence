import emailjs from '@emailjs/browser';

/**
 * Configuration for EmailJS service
 */
export const getEmailConfig = () => ({
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
});

/**
 * Check if EmailJS credentials have been supplied via environment variables
 */
export const isEmailConfigured = () => {
    const config = getEmailConfig();
    return Boolean(
        config.serviceId &&
        config.templateId &&
        config.publicKey &&
        !config.serviceId.includes('your_') &&
        !config.templateId.includes('your_') &&
        !config.publicKey.includes('your_')
    );
};

/**
 * Send an email inquiry via EmailJS
 *
 * @param {Object} data - Contact form data
 * @param {string} data.name - Sender's full name
 * @param {string} data.email - Sender's email address
 * @param {string} [data.service] - Service of interest
 * @param {string} [data.budget] - Budget range or timeline
 * @param {string} [data.company] - Company name
 * @param {string} data.message - Detailed project brief or message
 * @returns {Promise<{ success: boolean, simulated?: boolean, message?: string }>}
 */
export const sendContactEmail = async (data) => {
    const templateParams = {
        name: data.name?.trim() || '',
        from_name: data.name?.trim() || '',
        email: data.email?.trim() || '',
        from_email: data.email?.trim() || '',
        reply_to: data.email?.trim() || '',
        service: data.service?.trim() || 'General Inquiry',
        budget: data.budget?.trim() || 'Not specified',
        company: data.company?.trim() || 'Not specified',
        message: data.message?.trim() || '',
        subject: `New Quinzex Inquiry: ${data.service || 'General'} — ${data.name || 'Client'}`,
        timestamp: new Date().toLocaleString()
    };

    if (!isEmailConfigured()) {
        console.warn(
            '[EmailJS] Credentials not configured in .env.\n' +
            'Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.\n' +
            'Simulating successful dispatch for development preview:',
            templateParams
        );

        // Simulate network latency for authentic UI feedback
        await new Promise((resolve) => setTimeout(resolve, 800));
        return {
            success: true,
            simulated: true,
            message: 'Inquiry simulated successfully (EmailJS credentials not set in .env)'
        };
    }

    try {
        const config = getEmailConfig();
        const response = await emailjs.send(
            config.serviceId,
            config.templateId,
            templateParams,
            {
                publicKey: config.publicKey
            }
        );

        return {
            success: true,
            simulated: false,
            status: response.status,
            text: response.text
        };
    } catch (error) {
        console.error('[EmailJS] Failed to send contact email:', error);
        throw error;
    }
};
