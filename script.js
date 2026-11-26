/* ==========================================
   MARKETMIND DIGITAL MARKETING ANALYTICS
   Dashboard Functionality + Gemini AI
========================================== */

// 1. SAMPLE CAMPAIGN DATA
// These records are fictional and used for our academic project.

const sampleData = [
    { Campaign: "Summer Sale", Platform: "Instagram", Date: "2026-01-01", Impressions: 12500, Clicks: 625, Conversions: 38, Ad_Spend_INR: 7600 },
    { Campaign: "Summer Sale", Platform: "Facebook", Date: "2026-01-01", Impressions: 9800, Clicks: 392, Conversions: 21, Ad_Spend_INR: 5100 },
    { Campaign: "Summer Sale", Platform: "Google Ads", Date: "2026-01-01", Impressions: 15400, Clicks: 1232, Conversions: 96, Ad_Spend_INR: 14400 },

    { Campaign: "New Arrivals", Platform: "Instagram", Date: "2026-01-08", Impressions: 11200, Clicks: 560, Conversions: 32, Ad_Spend_INR: 6800 },
    { Campaign: "New Arrivals", Platform: "Facebook", Date: "2026-01-08", Impressions: 8700, Clicks: 348, Conversions: 18, Ad_Spend_INR: 4500 },
    { Campaign: "New Arrivals", Platform: "Google Ads", Date: "2026-01-08", Impressions: 13900, Clicks: 1112, Conversions: 82, Ad_Spend_INR: 13200 },

    { Campaign: "Winter Clearance", Platform: "Instagram", Date: "2026-01-15", Impressions: 14600, Clicks: 730, Conversions: 51, Ad_Spend_INR: 8200 },
    { Campaign: "Winter Clearance", Platform: "Facebook", Date: "2026-01-15", Impressions: 10800, Clicks: 432, Conversions: 29, Ad_Spend_INR: 5900 },
    { Campaign: "Winter Clearance", Platform: "Google Ads", Date: "2026-01-15", Impressions: 16700, Clicks: 1336, Conversions: 110, Ad_Spend_INR: 15800 },

    { Campaign: "Valentine Collection", Platform: "Instagram", Date: "2026-01-22", Impressions: 13200, Clicks: 792, Conversions: 64, Ad_Spend_INR: 9000 },
    { Campaign: "Valentine Collection", Platform: "Facebook", Date: "2026-01-22", Impressions: 9400, Clicks: 470, Conversions: 34, Ad_Spend_INR: 6200 },
    { Campaign: "Valentine Collection", Platform: "Google Ads", Date: "2026-01-22", Impressions: 14800, Clicks: 1332, Conversions: 105, Ad_Spend_INR: 15100 },

    { Campaign: "Weekend Offers", Platform: "Instagram", Date: "2026-02-01", Impressions: 11800, Clicks: 590, Conversions: 41, Ad_Spend_INR: 7200 },
    { Campaign: "Weekend Offers", Platform: "Facebook", Date: "2026-02-01", Impressions: 9100, Clicks: 364, Conversions: 24, Ad_Spend_INR: 5300 },
    { Campaign: "Weekend Offers", Platform: "Google Ads", Date: "2026-02-01", Impressions: 14200, Clicks: 1136, Conversions: 89, Ad_Spend_INR: 13800 },

    { Campaign: "Spring Fashion", Platform: "Instagram", Date: "2026-02-08", Impressions: 15800, Clicks: 948, Conversions: 73, Ad_Spend_INR: 10400 },
    { Campaign: "Spring Fashion", Platform: "Facebook", Date: "2026-02-08", Impressions: 11600, Clicks: 580, Conversions: 39, Ad_Spend_INR: 7100 },
    { Campaign: "Spring Fashion", Platform: "Google Ads", Date: "2026-02-08", Impressions: 17900, Clicks: 1611, Conversions: 128, Ad_Spend_INR: 18200 },

    { Campaign: "Flash Sale", Platform: "Instagram", Date: "2026-02-15", Impressions: 17100, Clicks: 1026, Conversions: 88, Ad_Spend_INR: 11800 },
    { Campaign: "Flash Sale", Platform: "Facebook", Date: "2026-02-15", Impressions: 12900, Clicks: 645, Conversions: 46, Ad_Spend_INR: 8300 },
    { Campaign: "Flash Sale", Platform: "Google Ads", Date: "2026-02-15", Impressions: 19300, Clicks: 1737, Conversions: 145, Ad_Spend_INR: 20500 },

    { Campaign: "Everyday Essentials", Platform: "Instagram", Date: "2026-02-22", Impressions: 10400, Clicks: 416, Conversions: 27, Ad_Spend_INR: 6100 },
    { Campaign: "Everyday Essentials", Platform: "Facebook", Date: "2026-02-22", Impressions: 8200, Clicks: 328, Conversions: 17, Ad_Spend_INR: 4200 },
    { Campaign: "Everyday Essentials", Platform: "Google Ads", Date: "2026-02-22", Impressions: 12800, Clicks: 1024, Conversions: 76, Ad_Spend_INR: 11900 }
];

let campaignData = [...sampleData];
let filteredData = [...campaignData];

let impressionsChart;
let clicksChart;
let conversionsChart;


// 2. HELPER FUNCTIONS

function formatNumber(value) {
    return Number(value).toLocaleString("en-IN");
}

function formatCurrency(value) {
    return "₹" + Number(value).toLocaleString("en-IN", {
        maximumFractionDigits: 2
    });
}

function calculateCTR(clicks, impressions) {
    return impressions > 0 ? (clicks / impressions) * 100 : 0;
}

function calculateCostPerConversion(spend, conversions) {
    return conversions > 0 ? spend / conversions : 0;
}


// 3. FILTER CAMPAIGNS

function applyFilters() {
    const platform = document.getElementById("platformFilter").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const search = document.getElementById("searchInput").value.toLowerCase();

    filteredData = campaignData.filter(row => {
        const matchesPlatform = platform === "All" || row.Platform === platform;
        const matchesStart = !startDate || row.Date >= startDate;
        const matchesEnd = !endDate || row.Date <= endDate;

        const matchesSearch =
            row.Campaign.toLowerCase().includes(search) ||
            row.Platform.toLowerCase().includes(search);

        return matchesPlatform && matchesStart && matchesEnd && matchesSearch;
    });

    updateDashboard();
}


// 4. CALCULATE AND DISPLAY KPI METRICS

function updateMetrics() {
    const impressions = filteredData.reduce((sum, row) => sum + row.Impressions, 0);
    const clicks = filteredData.reduce((sum, row) => sum + row.Clicks, 0);
    const conversions = filteredData.reduce((sum, row) => sum + row.Conversions, 0);
    const spend = filteredData.reduce((sum, row) => sum + row.Ad_Spend_INR, 0);

    const ctr = calculateCTR(clicks, impressions);
    const costPerConversion = calculateCostPerConversion(spend, conversions);

    document.getElementById("impressions").textContent = formatNumber(impressions);
    document.getElementById("clicks").textContent = formatNumber(clicks);
    document.getElementById("ctr").textContent = ctr.toFixed(2) + "%";
    document.getElementById("conversions").textContent = formatNumber(conversions);
    document.getElementById("costPerConversion").textContent = formatCurrency(costPerConversion);
}


// 5. DISPLAY CAMPAIGN TABLE

function updateTable() {
    const table = document.getElementById("campaignTable");
    table.innerHTML = "";

    if (filteredData.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;padding:25px;">
                    No campaigns found.
                </td>
            </tr>
        `;
        return;
    }

    filteredData.forEach(row => {
        const ctr = calculateCTR(row.Clicks, row.Impressions);
        const costPerConversion = calculateCostPerConversion(
            row.Ad_Spend_INR,
            row.Conversions
        );

        const tr = document.createElement("tr");

        const values = [
            row.Campaign,
            row.Platform,
            formatNumber(row.Impressions),
            formatNumber(row.Clicks),
            ctr.toFixed(2) + "%",
            formatNumber(row.Conversions),
            formatCurrency(costPerConversion)
        ];

        values.forEach(value => {
            const td = document.createElement("td");
            td.textContent = value;
            tr.appendChild(td);
        });

        table.appendChild(tr);
    });
}


// 6. CHARTS

function createCharts() {
    if (typeof Chart === "undefined") {
        document.querySelectorAll(".chart-card").forEach(card => {
            card.insertAdjacentHTML(
                "beforeend",
                '<p style="color:#d44">Charts require an internet connection to load Chart.js.</p>'
            );
        });
        return;
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    padding: 18
                }
            }
        }
    };

    impressionsChart = new Chart(
        document.getElementById("impressionsChart"),
        {
            type: "bar",
            data: {
                labels: [],
                datasets: [{
                    label: "Impressions",
                    data: [],
                    backgroundColor: "#766bff",
                    borderRadius: 6
                }]
            },
            options: chartOptions
        }
    );

    clicksChart = new Chart(
        document.getElementById("clicksChart"),
        {
            type: "line",
            data: {
                labels: [],
                datasets: [{
                    label: "Clicks",
                    data: [],
                    borderColor: "#17a98b",
                    backgroundColor: "rgba(23,169,139,0.12)",
                    fill: true,
                    tension: 0.35
                }]
            },
            options: chartOptions
        }
    );

    conversionsChart = new Chart(
        document.getElementById("conversionsChart"),
        {
            type: "doughnut",
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: ["#766bff", "#17a98b", "#ffad5c"],
                    borderWidth: 0
                }]
            },
            options: {
                ...chartOptions,
                cutout: "65%"
            }
        }
    );
}

function updateCharts() {
    if (!impressionsChart) return;

    const campaignTotals = {};

    filteredData.forEach(row => {
        if (!campaignTotals[row.Campaign]) {
            campaignTotals[row.Campaign] = {
                impressions: 0,
                clicks: 0
            };
        }

        campaignTotals[row.Campaign].impressions += row.Impressions;
        campaignTotals[row.Campaign].clicks += row.Clicks;
    });

    const campaignNames = Object.keys(campaignTotals);

    impressionsChart.data.labels = campaignNames;
    impressionsChart.data.datasets[0].data =
        campaignNames.map(name => campaignTotals[name].impressions);

    clicksChart.data.labels = campaignNames;
    clicksChart.data.datasets[0].data =
        campaignNames.map(name => campaignTotals[name].clicks);

    // Build platform totals dynamically from the currently filtered data.
    const platformTotals = {};

    filteredData.forEach(row => {
        platformTotals[row.Platform] =
            (platformTotals[row.Platform] || 0) + row.Conversions;
    });

    const platforms = Object.keys(platformTotals);

    conversionsChart.data.labels = platforms;
    conversionsChart.data.datasets[0].data =
        platforms.map(platform => platformTotals[platform]);

    impressionsChart.update();
    clicksChart.update();
    conversionsChart.update();
}


// 7. AUTOMATIC INSIGHTS

function updateInsights() {
    const box = document.getElementById("insightsContent");

    if (filteredData.length === 0) {
        box.textContent = "No campaign data available for the selected filters.";
        return;
    }

    const platformTotals = {};

    filteredData.forEach(row => {
        if (!platformTotals[row.Platform]) {
            platformTotals[row.Platform] = {
                impressions: 0,
                clicks: 0,
                conversions: 0,
                spend: 0
            };
        }

        const p = platformTotals[row.Platform];

        p.impressions += row.Impressions;
        p.clicks += row.Clicks;
        p.conversions += row.Conversions;
        p.spend += row.Ad_Spend_INR;
    });

    const platforms = Object.entries(platformTotals);

    const bestConversions = [...platforms].sort(
        (a, b) => b[1].conversions - a[1].conversions
    )[0];

    const bestCTR = [...platforms].sort(
        (a, b) =>
            calculateCTR(b[1].clicks, b[1].impressions) -
            calculateCTR(a[1].clicks, a[1].impressions)
    )[0];

    const lowestCost = [...platforms].sort(
        (a, b) =>
            calculateCostPerConversion(a[1].spend, a[1].conversions) -
            calculateCostPerConversion(b[1].spend, b[1].conversions)
    )[0];

    box.innerHTML = "";

    const insights = [
        `🏆 <strong>${bestConversions[0]}</strong> generated the most conversions (${formatNumber(bestConversions[1].conversions)}).`,
        `📈 <strong>${bestCTR[0]}</strong> achieved the highest CTR (${calculateCTR(bestCTR[1].clicks, bestCTR[1].impressions).toFixed(2)}%).`,
        `💰 <strong>${lowestCost[0]}</strong> had the lowest cost per conversion (${formatCurrency(calculateCostPerConversion(lowestCost[1].spend, lowestCost[1].conversions))}).`
    ];

    insights.forEach(insight => {
        const p = document.createElement("p");
        p.innerHTML = insight;
        p.style.marginBottom = "10px";
        box.appendChild(p);
    });
}


// 8. GEMINI AI SUGGESTIONS

async function generateAISuggestions() {
    const button = document.getElementById("aiSuggestionsButton");
    const status = document.getElementById("aiSuggestionsStatus");
    const output = document.getElementById("aiSuggestionsContent");

    if (filteredData.length === 0) {
        status.textContent = "No campaign data is available for the current filters.";
        output.textContent = "";
        return;
    }

    button.disabled = true;
    status.textContent = "Gemini is analyzing your campaign data...";
    output.textContent = "";

    console.log("Filtered campaign data:", JSON.stringify(filteredData[0], null, 2));

    try {
        const response = await fetch("/api/suggestions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                filteredData.map(campaign => ({
                    ...campaign,
                    CTR_percent: campaign.Impressions > 0
                        ? Number(((campaign.Clicks / campaign.Impressions) * 100).toFixed(2))
                        : null,
                    CPA_INR: campaign.Conversions > 0
                        ? Number((campaign.Ad_Spend_INR / campaign.Conversions).toFixed(2))
                        : null,
                    CPC_INR: campaign.Clicks > 0
                        ? Number((campaign.Ad_Spend_INR / campaign.Clicks).toFixed(2))
                        : null
                }))
            )
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Unable to generate suggestions.");
        }

        const suggestions = result.suggestions || "AI returned no suggestions.";

        const formatted = suggestions
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/\n/g, "<br>");

        output.innerHTML = formatted;
        status.textContent = "AI suggestions generated successfully.";
    } catch (error) {
        console.error("AI suggestions error:", error);
        status.textContent =
            "Could not generate suggestions. Check that the backend is running and try again.";
    } finally {
        button.disabled = false;
    }
}


// 9. CSV PARSER

function parseCSV(text) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (char === '"') {
            if (inQuotes && text[i + 1] === '"') {
                field += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === "," && !inQuotes) {
            row.push(field);
            field = "";
        } else if ((char === "\n" || char === "\r") && !inQuotes) {
            if (char === "\r" && text[i + 1] === "\n") i++;

            row.push(field);

            if (row.some(value => value.trim() !== "")) {
                rows.push(row);
            }

            row = [];
            field = "";
        } else {
            field += char;
        }
    }

    if (field.length > 0 || row.length > 0) {
        row.push(field);
        rows.push(row);
    }

    return rows;
}

function normalizeHeader(header) {
    return header.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

function updatePlatformFilter() {
    const platformFilter = document.getElementById("platformFilter");
    if (!platformFilter) return;

    const selectedPlatform = platformFilter.value;
    const platforms = [...new Set(
        campaignData
            .map(row => String(row.Platform || "").trim())
            .filter(Boolean)
    )].sort((a, b) => a.localeCompare(b));

    platformFilter.innerHTML = "";

    const allOption = document.createElement("option");
    allOption.value = "All";
    allOption.textContent = "All Platforms";
    platformFilter.appendChild(allOption);

    platforms.forEach(platform => {
        const option = document.createElement("option");
        option.value = platform;
        option.textContent = platform;
        platformFilter.appendChild(option);
    });

    platformFilter.value = platforms.includes(selectedPlatform)
        ? selectedPlatform
        : "All";
}


function loadCSV(text) {
    const rows = parseCSV(text);

    if (rows.length < 2) {
        alert("The CSV file does not contain enough data.");
        return;
    }

    const headers = rows[0].map(normalizeHeader);

    const required = [
        "campaign",
        "platform",
        "date",
        "impressions",
        "clicks",
        "conversions",
        "adspendinr"
    ];

    const missing = required.filter(column => !headers.includes(column));

    if (missing.length > 0) {
        alert("Missing required CSV columns: " + missing.join(", "));
        return;
    }

    const columnIndex = name => headers.indexOf(name);
    const newData = [];

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];

        const record = {
            Campaign: row[columnIndex("campaign")].trim(),
            Platform: row[columnIndex("platform")].trim(),
            Date: row[columnIndex("date")].trim(),
            Impressions: Number(row[columnIndex("impressions")]),
            Clicks: Number(row[columnIndex("clicks")]),
            Conversions: Number(row[columnIndex("conversions")]),
            Ad_Spend_INR: Number(row[columnIndex("adspendinr")])
        };

        const valid =
            record.Campaign &&
            record.Platform &&
            /^\d{4}-\d{2}-\d{2}$/.test(record.Date) &&
            [
                record.Impressions,
                record.Clicks,
                record.Conversions,
                record.Ad_Spend_INR
            ].every(value => Number.isFinite(value) && value >= 0) &&
            record.Clicks <= record.Impressions;

        if (!valid) {
            alert("Invalid data found on CSV row " + (i + 1) + ".");
            return;
        }

        newData.push(record);
    }

    if (newData.length === 0) {
        alert("No valid campaign records found.");
        return;
    }

    campaignData = newData;

    // Rebuild the dropdown using the platforms in the uploaded CSV.
    updatePlatformFilter();
    document.getElementById("platformFilter").value = "All";
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    document.getElementById("searchInput").value = "";

    applyFilters();

    alert("CSV uploaded successfully!");
}


// 10. EXPORT FILTERED CAMPAIGN DATA

function exportCSV() {
    if (filteredData.length === 0) {
        alert("There is no data to export.");
        return;
    }

    const headers = [
        "Campaign",
        "Platform",
        "Date",
        "Impressions",
        "Clicks",
        "CTR_Percent",
        "Conversions",
        "Ad_Spend_INR",
        "Cost_Per_Conversion"
    ];

    const rows = filteredData.map(row => [
        row.Campaign,
        row.Platform,
        row.Date,
        row.Impressions,
        row.Clicks,
        calculateCTR(row.Clicks, row.Impressions).toFixed(2),
        row.Conversions,
        row.Ad_Spend_INR,
        calculateCostPerConversion(
            row.Ad_Spend_INR,
            row.Conversions
        ).toFixed(2)
    ]);

    const csv = [headers, ...rows]
        .map(row =>
            row.map(value =>
                '"' + String(value).replace(/"/g, '""') + '"'
            ).join(",")
        )
        .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "MarketMind_Filtered_Campaigns.csv";
    link.click();

    URL.revokeObjectURL(url);
}


// 11. DARK / LIGHT MODE

function toggleTheme() {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    document.getElementById("themeToggle").textContent =
        isDark ? "☀ Light Mode" : "☾ Dark Mode";

    localStorage.setItem("marketmindTheme", isDark ? "dark" : "light");
}


// 12. UPDATE EVERYTHING

function updateDashboard() {
    updateMetrics();
    updateTable();
    updateCharts();
    updateInsights();
}


// 13. SIDEBAR ACTIVE LINK

function initializeSidebar() {
    const sidebarLinks = document.querySelectorAll(".sidebar nav a");

    if (!sidebarLinks.length) return;

    function setActiveLink(link) {
        sidebarLinks.forEach(item => item.classList.remove("active"));

        if (link) {
            link.classList.add("active");
        }
    }

    sidebarLinks.forEach(link => {
        link.addEventListener("click", function () {
            setActiveLink(this);
        });
    });

    function updateActiveLinkFromHash() {
        const currentHash = window.location.hash;

        if (!currentHash) return;

        const matchingLink = Array.from(sidebarLinks).find(
            link => link.getAttribute("href") === currentHash
        );

        if (matchingLink) {
            setActiveLink(matchingLink);
        }
    }

    updateActiveLinkFromHash();
    window.addEventListener("hashchange", updateActiveLinkFromHash);
}


// 14. INITIALIZE DASHBOARD

document.addEventListener("DOMContentLoaded", function () {

    // Populate the platform dropdown from the current campaign data.
    updatePlatformFilter();

    // Restore saved theme
    if (localStorage.getItem("marketmindTheme") === "dark") {
        document.body.classList.add("dark");
        document.getElementById("themeToggle").textContent = "☀ Light Mode";
    }

    // Initialize sidebar navigation
    initializeSidebar();

    // Create charts
    createCharts();

    // Initial dashboard display
    updateDashboard();

    // Filter listeners
    document.getElementById("platformFilter")
        .addEventListener("change", applyFilters);

    document.getElementById("startDate")
        .addEventListener("change", applyFilters);

    document.getElementById("endDate")
        .addEventListener("change", applyFilters);

    document.getElementById("searchInput")
        .addEventListener("input", applyFilters);

    // CSV upload
    document.getElementById("csvFile")
        .addEventListener("change", function (event) {
            const file = event.target.files[0];

            if (!file) return;

            const reader = new FileReader();

            reader.onload = function (e) {
                loadCSV(e.target.result);
            };

            reader.onerror = function () {
                alert("Unable to read the selected file.");
            };

            reader.readAsText(file);
        });

    // Theme toggle
    document.getElementById("themeToggle")
        .addEventListener("click", toggleTheme);

    // Export
    document.getElementById("exportButton")
        .addEventListener("click", exportCSV);

    // Gemini AI suggestions
    document.getElementById("aiSuggestionsButton")
        .addEventListener("click", generateAISuggestions);
});
