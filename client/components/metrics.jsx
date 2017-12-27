import React from 'react';
import { Bar } from 'react-chartjs-2';


class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ['In Progress', 'Submitted', 'Phone Screen', 'Onsite Interview', 'Offer', 'Rejected'],
        datasets: [{
          label: 'Applications',
          data: [6, 18, 4, 3, 0, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ]
        }]
      }
    }
  }

  render() {
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          width={50}
          height={475}
          options={{
            /*
            scales: {
              xAxes: [{
                stacked: true
              }],
              yAxes: [{
                stacked: true
              }]
            },
            */
            maintainAspectRatio: false,
            title: {
              display: true,
              text: 'Total Applications',
              fontSize: 25,
            },
            legend: {
              display: true,
              position: 'top',
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;
