/*
 * Copyright 2017 Banco Bilbao Vizcaya Argentaria, S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component} from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DashboardsService} from '../../services/dashboards.service';
import {Dashboard} from '../../model/dashboard';
import {SlackService} from '../../services/slack.service';

@Component({
  selector: 'new-and-edit-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [DashboardsService, SlackService]
})
export class FormComponent {

  dashboard: Dashboard;
  slackChannels: {
    keys?: string[],
    values?: Map<string,string>
  } = {};
  slack: {
    clientId?: string,
    clientSecret?: string
  } = {};
  edit: boolean = false;
  temp: {
    applications?: string,
    boards?: string,
    codeRepos?: string,
    programIncrement?: string
  } = {};
  errorMessage: string;

  constructor(private dashboardsService: DashboardsService,
              private slackService: SlackService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if(id) {
      this.edit = true;
      this.dashboardsService.getDashboard(id).then(dashboard => this.setDashboard(dashboard));
    } else {
      this.setDashboard(new Dashboard());
    }
  }

  setDashboard(dashboard: Dashboard) {
    this.dashboard = dashboard;
    this.temp.boards = this.dashboard.boards ? this.dashboard.boards.join(',') : '';
    this.temp.applications = this.dashboard.applications ? this.dashboard.applications.join(',') : '';
    this.temp.codeRepos = this.dashboard.codeRepos ? this.dashboard.codeRepos.join(',') : '';
    this.updateSlackChannels();
  }

  mirrorTempValues() {
    this.dashboard.boards = this.temp.boards.length ? this.temp.boards.split(',').map((e) => e.trim()) : undefined;
    this.dashboard.applications = this.temp.applications.length ? this.temp.applications.split(',').map((e) => e.trim()) : undefined;
    this.dashboard.codeRepos = this.temp.codeRepos.length ? this.temp.codeRepos.split(',').map((e) => e.trim()) : undefined;
  }

  back(): void {
    this.router.navigate(['/list']);
  }

  private updateSlackChannels(): void {
    this.slackService.getChannels(this.dashboard).then((channels) => {
      this.slackChannels.values = channels;
      this.slackChannels.keys = channels && Object.keys(channels);
    });
  }

  private setSlackToken(token:string): void {
    this.dashboard.slackToken = token;
    this.updateSlackChannels();
  }

  onSave(dashboard: Dashboard): void {
    this.dashboardsService.saveDashboard(dashboard, this.edit)
      .then(dashboard => {
        if(dashboard) {
          this.dashboard = dashboard;
          this.back();
        }
      })
      .catch((error: any) => {
        this.errorMessage = <any>error;
      });  }

  signSlack(dashboard: Dashboard): void {
    this.slackService.signSlack(this.dashboard.slackTeam, this.slack.clientId, this.slack.clientSecret)
      .then((token) => this.setSlackToken(token))
      .catch((error: any) => {
        this.errorMessage = <any>error;
      });
  }

}
