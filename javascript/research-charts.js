// Determine mobile font size once
const isMobile = window.innerWidth < 600;
const isTablet = window.innerWidth >= 600 && window.innerWidth <= 1024;
const tickFontSize = isMobile ? 10 : isTablet ? 12 : 14;
const titleFontSize = isMobile ? 14 : isTablet ? 16 : 18;
const legendFontSize = isMobile ? 10 : isTablet ? 12 : 14;

// Store chart instances
let charts = {};

// Function to update chart configurations
function updateChartConfigurations() {
    const isMobile = window.innerWidth < 600;
    const isTablet = window.innerWidth >= 600 && window.innerWidth <= 1024;
    const newFontSize = isMobile ? 10 : isTablet ? 12 : 14;
    const newTitleSize = isMobile ? 14 : isTablet ? 16 : 18;
    const newLegendSize = isMobile ? 10 : isTablet ? 12 : 14;
    
    Object.values(charts).forEach(chart => {
        if (chart.options && chart.options.scales) {
            // Update x-axis font size
            if (chart.options.scales.x && chart.options.scales.x.ticks) {
                chart.options.scales.x.ticks.font = { size: newFontSize };
            }
            // Update y-axis font size
            if (chart.options.scales.y && chart.options.scales.y.ticks) {
                chart.options.scales.y.ticks.font = { size: newFontSize };
            }
            // Update r-axis font size for radar charts
            if (chart.options.scales.r && chart.options.scales.r.ticks) {
                chart.options.scales.r.ticks.font = { size: newFontSize };
            }
            // Update title font size
            if (chart.options.plugins && chart.options.plugins.title) {
                chart.options.plugins.title.font = { size: newTitleSize };
            }
            // Update legend font size
            if (chart.options.plugins && chart.options.plugins.legend) {
                chart.options.plugins.legend.labels.font = { size: newLegendSize };
            }
        }
        chart.update();
    });
}

// Add resize event listener
window.addEventListener('resize', updateChartConfigurations);

// Common chart options for better responsiveness
const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    resizeDelay: 0,
    onResize: function(chart, size) {
        // Get the container width
        const containerWidth = chart.canvas.parentElement.clientWidth;
        
        // Set minimum width to prevent excessive shrinking
        const minWidth = 800;
        const targetWidth = Math.max(containerWidth, minWidth);
        
        // Calculate height based on aspect ratio
        const targetHeight = targetWidth / 2;
        
        // Update chart size
        chart.canvas.style.width = targetWidth + 'px';
        chart.canvas.style.height = targetHeight + 'px';
        
        // Force chart update
        chart.update('none');
    },
    plugins: {
        legend: {
            position: 'top',
            align: 'center',
            labels: {
                boxWidth: 10,
                padding: 12,
                font: {
                    size: legendFontSize
                }
            }
        },
        tooltip: {
            padding: 14,
            titleFont: {
                size: titleFontSize
            },
            bodyFont: {
                size: tickFontSize
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", function () {
// Chart 1: Yang et al. (2023) - Language Scores by TV During Meals
const ctxMealTVChart = document.getElementById('mealTVChart');
if (ctxMealTVChart) {
  ctxMealTVChart.width = 1500;
  charts.mealTVChart = new Chart(ctxMealTVChart, {
    type: 'bar',
    data: {
      labels: ['2.5 Years', '3.5 Years', '5.5 Years'],
      datasets: [
        {
          label: 'TV On During Meals',
          data: [91, 88, 86],
          backgroundColor: 'rgba(220, 88, 88, 0.7)'
        },
        {
          label: 'No TV During Meals',
          data: [96, 95, 94],
          backgroundColor: 'rgba(88, 170, 220, 0.7)'
        }
      ]
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        title: {
          display: true,
          text: 'Language Scores by TV During Meals (ELFE Study)',
          font: {
            size: titleFontSize
          },
          padding: {
            top: 10,
            bottom: 20
          }
        }
      },
      scales: {
        x: {
          ticks: {
            autoSkip: false,
            maxRotation: 45,
            minRotation: 45,
            font: { size: tickFontSize },
            padding: 10
          },
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Language Score (Standardized)',
            font: { size: tickFontSize }
          },
          ticks: {
            font: { size: tickFontSize },
            padding: 10
          }
        }
      },
      layout: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }
      }
    }
  });
}

// Chart 2: Gillioz et al. (2024) – Tactile Exploration vs Screen Habits
const ctxTactileChart = document.getElementById('tactileChart');
if (ctxTactileChart) {
  ctxTactileChart.width = 1500;
  charts.tactileChart = new Chart(ctxTactileChart, {
    type: 'bar',
    data: {
      labels: ['No\nScreen\nUse', 'Low\nScreen\nUse', 'Moderate\nScreen\nUse', 'High\nScreen\nUse'],
      datasets: [
        {
          label: 'Average Tactile Strategy Score',
          data: [85, 78, 72, 65],
          backgroundColor: 'rgba(108, 172, 129, 0.7)',
          borderColor: 'rgba(108, 172, 129, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        title: {
          display: true,
          text: 'Tactile Exploration Skills by Screen Exposure',
          font: {
            size: titleFontSize
          }
        }
      },
      scales: {
        x: {
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            font: { size: tickFontSize },
            callback: function(value) {
              const label = this.getLabelForValue(value);
              return label.length > 12 ? label.match(/.{1,12}/g) : label;
            }
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Exploration Score (%)'
          },
          ticks: {
            font: { size: tickFontSize }
          }
        }
      }
    }
  });
}

// Chart 3: Barr et al. (2024) – Media Use Context (DREAMER Framework)
const ctxDreamerChart = document.getElementById('dreamerChart');
if (ctxDreamerChart) {
  ctxDreamerChart.width = 2000,
  charts.dreamerChart = new Chart(ctxDreamerChart, {
    type: 'bar',
    data: {
      labels: ['Babysitter', 'Co-Viewing', 'Learning', 'Violence', 'Sleep'],
      datasets: [
        {
          label: 'Negative Media Use',
          data: [90, 20, 30, 95, 85],
          backgroundColor: 'rgba(220, 88, 88, 0.7)',
          borderColor: 'rgba(220, 88, 88, 1)',
          borderWidth: 1
        },
        {
          label: 'Positive Media Use',
          data: [10, 85, 80, 5, 15],
          backgroundColor: 'rgba(88, 170, 220, 0.7)',
          borderColor: 'rgba(88, 170, 220, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        title: {
          display: true,
          text: 'Media Use Effects by Context',
          font: {
            size: titleFontSize
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label}: ${context.formattedValue} effect level`;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            font: { size: tickFontSize },
            callback: function(value) {
              const label = this.getLabelForValue(value);
              return label.length > 16 ? label.match(/.{1,16}/g) : label;
            }
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Effect Level (%)'
          },
          ticks: {
            font: { size: tickFontSize }
          }
        }
      },
      layout: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }
      }
    }
  });
}

// Chart 4: Shepherd & Kidd (2024) – Attention vs Learning in Screen Context
const ctxAttentionChart = document.getElementById('attentionChart');
if (ctxAttentionChart) {
  ctxAttentionChart.width = 1500,
  charts.attentionChart = new Chart(ctxAttentionChart, {
    type: 'bar',
    data: {
      labels: ['Simple \n Background', 'Flashy \n Background'],
      datasets: [
        {
          label: 'Visual Attention (Looking Time)',
          data: [50, 90],
          backgroundColor: 'rgba(88, 170, 220, 0.7)'
        },
        {
          label: 'Learning Outcome (Word Accuracy)',
          data: [85, 60],
          backgroundColor: 'rgba(220, 88, 88, 0.7)'
        }
      ]
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        title: {
          display: true,
          text: 'Visual Attention vs Learning in Preschoolers',
          font: {
            size: titleFontSize
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              if (context.dataset.label === 'Visual Attention (Looking Time)') {
                return `Looking Time in ${context.label}: ${context.raw}%`;
              } else {
                return `Learning Accuracy in ${context.label}: ${context.raw}%`;
              }
            }
          }
        },
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        x: {
          ticks: {
            font: { size: tickFontSize },
            callback: function(value) {
              const label = this.getLabelForValue(value);
              return label.length > 12 ? label.match(/.{1,12}/g) : label;
            }
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Percentage (%)'
          },
          ticks: {
            font: { size: tickFontSize }
          }
        }
      }
    }
  });
}

// Chart 5: Madigan et al. (2020) – Screen Time & Language Development Meta-Analysis
const ctxLanguageMetaChart = document.getElementById('languageMetaChart');
if (ctxLanguageMetaChart) {
  ctxLanguageMetaChart.width = 1500,
  charts.languageMetaChart = new Chart(ctxLanguageMetaChart, {
    type: 'bar',
    data: {
      labels: ["Background \n TV", 'General \n Screen \nTime', 'Educational \n Screen \nTime', 'Co-Viewing'],
      datasets: [
        {
          label: 'Effect on Language Development',
          data: [-0.3, -0.2, 0.1, 0.15],
          backgroundColor: function(context) {
            return context.raw < 0 ? 'rgba(220, 88, 88, 0.7)' : 'rgba(88, 170, 220, 0.7)';
          }
        }
      ]
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        title: {
          display: true,
          text: 'Screen Time and Language Outcomes',
          font: {
            size: titleFontSize
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const val = context.raw;
              const direction = val > 0 ? 'Positive' : 'Negative';
              return `${context.label}: ${direction} effect (${val})`;
            }
          }
        },
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            autoSkip: false,
            maxRotation:65,
            font: { size: tickFontSize },
            callback: function(value) {
              const label = this.getLabelForValue(value);
              return label.length > 20 ? label.match(/.{1,20}/g) : label;
            }
          }
        },
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "Effect Size (Cohen's d)"
          },
          ticks: {
            font: { size: tickFontSize }
          }
        }
      },
      layout: {
        padding: {
          top: 0,
          right: 10,
          bottom: 30,
          left: 10
        }
      }
    }
  });
}

// Chart 6: Pickard et al. (2024) – Sleep Efficiency and Night Wakings
const ctxBedtimeChart = document.getElementById('bedtimeChart');
if (ctxBedtimeChart) {
  ctxBedtimeChart.width = 1500,
  charts.bedtimeChart = new Chart(ctxBedtimeChart, {
    type: 'bar',
    data: {
      labels: ['Sleep\nEfficiency\n(%)', 'Night\nWakings'],
      datasets: [
        {
          label: 'Intervention Group',
          data: [90, 1.2],
          backgroundColor: 'rgba(88, 170, 220, 0.7)'
        },
        {
          label: 'Control Group',
          data: [83, 2.0],
          backgroundColor: 'rgba(220, 88, 88, 0.7)'
        }
      ]
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        title: {
          display: true,
          text: 'Sleep Improvements with Screen Removal',
          font: {
            size: titleFontSize
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label} - ${context.label}: ${context.raw}`;
            }
          }
        },
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        x: {
          ticks: {
            font: { size: tickFontSize },
            callback: function(value) {
              const label = this.getLabelForValue(value);
              return label.length > 12 ? label.match(/.{1,12}/g) : label;
            }
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Measurement Value'
          },
          ticks: {
            font: { size: tickFontSize }
          }
        }
      }
    }
  });
}
// Chart 7: Rayce et al. (2024) – Mobile Use and Language Outcomes
const ctxDailyMobileChart = document.getElementById('dailyMobileChart');
if (ctxDailyMobileChart) {
  ctxDailyMobileChart.width = 1500,
  charts.dailyMobileChart = new Chart(ctxDailyMobileChart, {
    type: 'bar',
    data: {
      labels: [ 'Comprehension\nScore', 'Expression \n Score'],
      datasets: [
        {
          label: 'Low Mobile Use (<1 hr/day)',
          data: [85, 80],
          backgroundColor: 'rgba(88, 170, 220, 0.7)'
        },
        {
          label: 'High Mobile Use (≥1 hr/day)',
          data: [78, 70],
          backgroundColor: 'rgba(220, 88, 88, 0.7)'
        }
      ]
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        title: {
          display: true,
          text: 'Language Outcomes by Mobile Device Use',
          font: {
            size: titleFontSize
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label} - ${context.label}: ${context.raw}`;
            }
          }
        },
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        x: {
          autoSkip: false,
          maxRotation: 0,
          ticks: {
            font: { size: tickFontSize },
            callback: function(value) {
              const label = this.getLabelForValue(value);
              return label.length > 16 ? label.match(/.{1,16}/g) : label;
            }
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Score (Standardized)'
            
          },
          ticks: {
            font: { size: tickFontSize }
          }
        }
      }
    }
  });
}
// Chart 8: Moldenhauer (2024) – Screen Time vs Outdoor Play Profiles
const ctxOutdoorPlayChart = document.getElementById('outdoorPlayChart');
if (ctxOutdoorPlayChart) {
  ctxOutdoorPlayChart.width = 1500,
  charts.outdoorPlayChart = new Chart(ctxOutdoorPlayChart, {
    type: 'bar',
    data: {
      labels: [
        'Low ST/\n High OP',
        'High TV/\nHigh OP',
        'Medium ST/\nLow OP',
        'High ST/\nHigh OP'
      ],
      datasets: [
        {
          label: 'Cognitive & Emotional Development Score',
          data: [90, 75, 70, 68],
          backgroundColor: 'rgba(88, 170, 220, 0.7)'
        }
      ]
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        title: {
          display: true,
          text: 'Screen Time & Outdoor Play',
          font: {
            size: titleFontSize
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.raw} (Score)`;
            }
          }
        },
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            font: { size: tickFontSize },
            callback: function(value) {
              const label = this.getLabelForValue(value);
              return label.length > 18 ? label.match(/.{1,18}/g) : label;
            }
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Development Score'
          },
          ticks: {
            font: { size: tickFontSize }
          }
        }
      }
    }
  });
}

const ctxContentTypeChart = document.getElementById('contentTypeChart');
if (ctxContentTypeChart) {
  ctxContentTypeChart.width = 1500,
  charts.contentTypeChart = new Chart(ctxContentTypeChart, {
    type: 'bar',
    data: {
      labels: [
        'Educational\n + Co-viewed',
        'Educational\n + Solo',
        'Entertain.\n + Solo',
        'Fast-paced \n Cartoons',
        'Multitasking\n(e.g. TV + \nTablet)'
      ],
      datasets: [
        {
          label: 'Cognitive Benefit Score',
          data: [85, 70, 55, 45, 40],
          backgroundColor: [
            'rgba(88, 170, 220, 0.8)',
            'rgba(88, 170, 220, 0.6)',
            'rgba(220, 88, 88, 0.6)',
            'rgba(220, 88, 88, 0.7)',
            'rgba(220, 88, 88, 0.8)'
          ]
        }
      ]
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        title: {
          display: true,
          text: 'Cognitive Impact by Type of Screen Use',
          font: {
            size: titleFontSize
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.raw} (Benefit Score)`;
            }
          }
        },
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            font: { size: tickFontSize },
            callback: function(value) {
              const label = this.getLabelForValue(value);
              return label.length > 18 ? label.match(/.{1,12}/g) : label;
            }
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Cognitive Benefit Score'
          },
          ticks: {
            font: { size: tickFontSize }
          }
        }
      }
    }
  });
}
// Chart 10: Kerai et al. (2022) – Risk of Developmental Vulnerability by Screen Use
const ctxDevHealthChart = document.getElementById('devHealthChart');
if (ctxDevHealthChart) {
  ctxDevHealthChart.width = 1500,
  charts.devHealthChart = new Chart(ctxDevHealthChart, {
    type: 'bar',
    data: {
      labels: [
        'Language &\nThinking',
        'Social\nSkills',
        'Communication',
        'Physical\nHealth',
        'Emotional\nRegulation'
      ],
      datasets: [
        {
          label: 'Increased Risk (%) from >1hr/day screen use',
          data: [81, 60, 60, 45, 40],
          backgroundColor: 'rgba(220, 88, 88, 0.7)'
        }
      ]
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        title: {
          display: true,
          text: 'Developmental Risks by Excessive Screen Time',
          font: {
            size: titleFontSize
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.raw}% more likely to fall behind`;
            }
          }
        },
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            font: { size: tickFontSize },
            callback: function(value) {
              const label = this.getLabelForValue(value);
              return label.length > 16 ? label.match(/.{1,12}/g) : label;
            }
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          maxRotation: 0,
          title: {
            display: true,
            text: 'Increased Risk (%)'
          },
          ticks: {
            font: { size: tickFontSize }
          }
        }
      }
    }
  });
}
// Chart 11: Madi (2025) – Social Cognition Effects of Early Screen Exposure
const ctxSocialCognitionChart = document.getElementById('socialCognitionChart');
if (ctxSocialCognitionChart) {
  ctxSocialCognitionChart.width = 1500,
  charts.socialCognitionChart = new Chart(ctxSocialCognitionChart, {
    type: 'bar',
    data: {
      labels: [
        'Empathy',
        'Facial\nExpression\nRecognition',
        'Executive\nFunction',
        'Emotional\nRegulation',
        'Real-World\nInteraction\nPreference'
      ],
      datasets: [
        {
          label: 'Impact Level (Lower = Worse)',
          data: [40, 45, 50, 42, 38],
          backgroundColor: 'rgba(220, 88, 88, 0.7)'
        },
        {
          label: 'Improved After Screen Reduction',
          data: [75, 72, 78, 74, 70],
          backgroundColor: 'rgba(88, 170, 220, 0.7)'
        }
      ]
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        title: {
          display: true,
          text: 'Social Cognition Effects of \nEarly Screen Exposure',
          font: {
            size: titleFontSize
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.dataset.label} - ${context.label}: ${context.raw}`;
            }
          }
        },
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        x: {
          ticks: {
            font: { size: tickFontSize },
            callback: function(value) {
              const label = this.getLabelForValue(value);
              return label.length > 16 ? label.match(/.{1,12}/g) : label;
            }
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          maxRotation:0,
          title: {
            display: true,
            text: 'Score / Impact Level'
          },
          ticks: {
            font: { size: tickFontSize }
          }
        }
      }
    }
  });
}
// Chart 12: Wang et al. (2024) – Screen Content Types and Mental Health Risk
const ctxScreenTypeChart = document.getElementById('screenTypeChart');
if (ctxScreenTypeChart) {
  ctxScreenTypeChart.width = 1500,
  charts.screenTypeChart = new Chart(ctxScreenTypeChart, {
    type: 'bar',
    data: {
      labels: [
        'Educational\nPrograms',
        'Entertainment\nContent',
        'Games',
        'Social\nMedia',
        'Adult\nContent'
      ],
      datasets: [
        {
          label: 'Mental Health Risk Score',
          data: [30, 50, 55, 60, 85],
          backgroundColor: [
            'rgba(88, 170, 220, 0.7)',
            'rgba(180, 180, 180, 0.7)',
            'rgba(200, 150, 100, 0.7)',
            'rgba(200, 150, 100, 0.7)',
            'rgba(220, 88, 88, 0.7)'
          ]
        }
      ]
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        title: {
          display: true,
          text: 'Mental Health Risk by Screen Content Type',
          font: {
            size: titleFontSize
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: Risk Score ${context.raw}`;
            }
          }
        },
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            font: { size: tickFontSize },
            callback: function(value) {
              const label = this.getLabelForValue(value);
              return label.length > 16.5 ? label.match(/.{1,17}/g) : label;
            }
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Risk Score (0–100)'
          },
          ticks: {
            font: { size: tickFontSize }
          }
        }
      }
    }
  });
}
// Chart 13: Swider-Cios et al. (2023) – Effects of Screen Use with vs without Parental Mediation
const ctxParentalMediationChart = document.getElementById('parentalMediationChart');
if (ctxParentalMediationChart) {
  ctxParentalMediationChart.width = 1500,
  charts.parentalMediationChart = new Chart(ctxParentalMediationChart, {
    type: 'bar',
    data: {
      labels: [
        'Under 2 yrs\n(solo)',
        'Under 2 yrs\n(co-viewed)',
        '2–5 yrs\n(solo)',
        '2–5 yrs\n(co-viewed)'
      ],
      datasets: [
        {
          label: 'Developmental Benefit Score',
          data: [30, 55, 50, 75],
          backgroundColor: [
            'rgba(220, 88, 88, 0.7)',
            'rgba(88, 170, 220, 0.7)',
            'rgba(220, 150, 100, 0.7)',
            'rgba(88, 220, 170, 0.7)'
          ]
        }
      ]
    },
    options: {
      ...commonChartOptions,
      plugins: {
        ...commonChartOptions.plugins,
        title: {
          display: true,
          text: 'Parental Mediation and Developmental Outcomes',
          font: {
            size: titleFontSize
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: Score ${context.raw}`;
            }
          }
        },
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            font: { size: tickFontSize },
            callback: function(value) {
              const label = this.getLabelForValue(value);
              return label.length > 16 ? label.match(/.{1,16}/g) : label;
            }
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Benefit Score (0–100)'
          },
          ticks: {
            font: { size: tickFontSize }
          }
        }
      }
    }
  });
}

// Initial configuration update
updateChartConfigurations();
});

document.addEventListener("DOMContentLoaded", function () {
  const indexList = document.querySelector(".page-index");
  if (!indexList) return;

  // Clear previous items
  indexList.innerHTML = "";

  const chartTitles = [
    { id: "mealTVChart", title: "Language Scores by TV During Meals" },
    { id: "tactileChart", title: "Tactile Exploration vs Screen Habits" },
    { id: "dreamerChart", title: "DREAMER Framework – Media Context" },
    { id: "attentionChart", title: "Visual Attention vs Learning (Preschoolers)" },
    { id: "languageMetaChart", title: "Screen Time & Language Development" },
    { id: "bedtimeChart", title: "Sleep Improvements with Screen Removal" },
    { id: "dailyMobileChart", title: "Language Outcomes by Mobile Device Use" },
    { id: "outdoorPlayChart", title: "Screen Time & Outdoor Play" },
    { id: "contentTypeChart", title: "Cognitive Impact by Type of Screen Use" },
    { id: "devHealthChart", title: "Developmental Risks by Excessive Screen Time" },
    { id: "socialCognitionChart", title: "Social Cognition & Early Screens" },
    { id: "screenTypeChart", title: "Mental Health & Content Type" },
    { id: "parentalMediationChart", title: "Parental Mediation Effects" }
  ];

  chartTitles.forEach(item => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${item.id}`;
    link.textContent = item.title;
    li.appendChild(link);
    indexList.appendChild(li);
  });
});




