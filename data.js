// Données des formations
const formationsData = {
    formations: [
        {
            id: 1,
            titre: "Attestation du Langue Allemand",
            etablissement: "Centre de Formation Proactic Ahfir",
            annee: "2024 - 2025",
            description: "Formation en langue allemande pour élargir les compétences linguistiques et les opportunités professionnelles.",
            icone: "language"
        },
        {
            id: 2,
            titre: "Baccalauréat Section Sciences Physiques",
            etablissement: "Lycée Nahda Ahfir",
            annee: "2022 - 2023",
            description: "Diplôme du baccalauréat en sciences physiques avec spécialisation scientifique.",
            icone: "graduation-cap"
        },
        {
            id: 3,
            titre: "Diplôme de Technicien en Électricité de Maintenance Industrielle",
            etablissement: "OFPPT Berkane",
            annee: "2021 - 2023",
            description: "Formation technique approfondie en maintenance électrique industrielle avec approche pratique.",
            icone: "industry"
        },
        {
            id: 4,
            titre: "Certification Microsoft Office Spécialiste (Word/Excel)",
            etablissement: "Centre Privé",
            annee: "2021 - 2022",
            description: "Certification des compétences avancées en traitement de texte et tableurs Microsoft Office.",
            icone: "certificate"
        },
        {
            id: 5,
            titre: "Diplôme Qualification en Électricité d'Installation",
            etablissement: "OFPPT Ahfir",
            annee: "2019 - 2021",
            description: "Formation fondamentale en installation électrique pour bâtiments résidentiels et commerciaux.",
            icone: "bolt"
        },
        {
            id: 6,
            titre: "Baccalauréat Section Lettre",
            etablissement: "Lycée Nahda Ahfir",
            annee: "2015 - 2016",
            description: "Diplôme du baccalauréat en section littéraire avec spécialisation en lettres.",
            icone: "book"
        }
    ]
};

// Exporter les données pour qu'elles soient accessibles via window
if (typeof window !== 'undefined') {
    window.formationsData = formationsData;
}
