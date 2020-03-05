import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import openmrsRootDecorator from "@openmrs/react-root-decorator";
import { PatientBanner } from "@openmrs/esm-patient-chart-widgets";
import WorkspaceWrapper from "./workspace/workspace-wrapper.component";
import ChartReview from "./chart-review/chart-review.component";
import styles from "./root.css";
import { defineConfigSchema, validators } from "@openmrs/esm-module-config";
import { AppPropsContext } from "./app-props-context";
import { esmPatientChartConfig } from "./chart-config";

function Root(props) {
  defineConfigSchema("@openmrs/esm-patient-chart", esmPatientChartConfig);
  /*
  defineConfigSchema("@openmrs/esm-patient-chart", {
    primaryNavbar: {
      arrayElements: {
        label: { validators: [validators.isString] },
        path: { validators: [validators.isString] },
        view: { validators: [validators.isString] }
      },
      default: [
        {
          label: "Summary",
          path: "/summary",
          view: "summaryDashboard"
        },
        {
          label: "Results",
          path: "/results",
          view: "resultsTabbedView"
        },
        {
          label: "Orders",
          path: "/orders",
          view: "ordersTabbedView"
        },
        {
          label: "Encounters",
          path: "/encounters",
          view: "encountersOverviewDashboard"
        },
        {
          label: "Conditions",
          path: "/conditions",
          view: "conditionsOverview"
        },
        {
          label: "Programs",
          path: "/programs",
          view: "programsOverviewDashboard"
        },
        {
          label: "Allergies",
          path: "/allergies",
          view: "allergiesOverviewDashboard"
        },
        {
          label: "Appointments",
          path: "/appointments",
          view: "appointmentsOverviewDashboard"
        }
      ]
    },

    dashboardDefinitions: {
      arrayElements: {
        name: { validators: [validators.isString] },
        title: { validators: [validators.isString] },
        layout: {
          columns: {}
        },
        widgets: {
          arrayElements: {
            name: { validators: [validators.isString] },
            esModule: { validators: [validators.isString] },
            label: { validators: [validators.isString] },
            path: { validators: [validators.isString] },
            layout: {
              rowSpan: {},
              columnSpan: {}
            }
          }
        }
      },
      default: []
    },

    widgetDefinitions: {
      arrayElements: {
        name: { validators: [validators.isString] },
        esModule: { validators: [validators.isString] },
        label: { validators: [validators.isString] },
        path: { validators: [validators.isString] }
      },
      default: []
    },

    tabbedViewDefinitions: {
      arrayElements: {
        name: { validators: [validators.isString] },
        title: { validators: [validators.isString] },
        navbar: {
          arrayElements: {
            label: { validators: [validators.isString] },
            path: { validators: [validators.isString] },
            view: { validators: [validators.isString] }
          }
        }
      },
      default: []
    }
  });
  */

  return (
    <AppPropsContext.Provider value={{ appProps: props }}>
      <BrowserRouter basename={window["getOpenmrsSpaBase"]()}>
        <main
          className="omrs-main-content"
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column"
          }}
        >
          <aside style={{ height: "2.75rem" }}>
            <Route path="/patient/:patientUuid/chart">
              <PatientBanner match={props.match} />
            </Route>
          </aside>
          <div className={styles.grid}>
            <div className={styles.chartreview}>
              <Route path="/patient/:patientUuid/chart/:view?/:subview?">
                <ChartReview />
              </Route>
            </div>
            <div className={styles.workspace}>
              <Route
                path="/patient/:patientUuid/chart"
                render={routeProps => <WorkspaceWrapper {...routeProps} />}
              />
            </div>
          </div>
        </main>
      </BrowserRouter>
    </AppPropsContext.Provider>
  );
}

function getPatientChartRootUrl() {
  return {
    url: "/patient/:patientUuid/chart/",
    name: "Chart"
  };
}

export default openmrsRootDecorator({
  featureName: "patient-chart",
  moduleName: "@openmrs/esm-patient-chart"
})(Root);

/*
        <div className={styles.sidebar}>
          <Sidebar></Sidebar>
        </div>
*/

export type ChartConfigType = {
  primaryNavbar: NavbarType[];
  widgetDefinitions: {
    name: string;
    esModule?: string;
    label?: string;
    path?: string;
  };

  dashboardDefinitions: {
    name: string;
    title: string;
    layout: { columns: number };
    widgets: {
      name: string;
      esModule: string;
      label: string;
      path: string;
      layout: {
        rowSpan: number;
        columnSpan: number;
      };
    }[];
  };

  tabbedDashboardDefinitions: {
    name: string;
    title: string;
    navbar: NavbarType;
  }[];
};

export type NavbarType = { label: string; path: string; view: string };
