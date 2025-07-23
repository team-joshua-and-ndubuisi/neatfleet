export interface InfoCardData {
    title: string;
    lines: string[];
}

const homeInfoCards: InfoCardData[] = [
    {
        title: "Serivce Hours",
        lines: [
            "Mon - Fri: 9:00 AM - 5:00 PM",
            "Sat: 10:00 AM - 2:00 PM",
            "Sun: Closed",
        ]
    },
    {
        title: "Business Address",
        lines: [
            "1234 Fleet Avenue",
            "Suite 567",
            "Dallas, TX 12345"
        ]
    },
    {
        title: "Contact Information",
        lines: [
            "Email: contact@neatfleet.com",
            "Phone: (123) 456-7890",
        ]
    }
]

export default homeInfoCards