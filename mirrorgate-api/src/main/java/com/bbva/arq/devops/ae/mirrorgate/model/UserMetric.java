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

package com.bbva.arq.devops.ae.mirrorgate.model;

import com.bbva.arq.devops.ae.mirrorgate.core.utils.Platform;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user-metrics")
public class UserMetric extends BaseModel {

    @Indexed
    private String viewId;

    private String appVersion;

    private Platform platform;

    @Deprecated
    private Long rtActiveUsers;

    @Deprecated
    private Long ga7dayUsers;

    private String name;

    private String value;

    public String getViewId() {
        return viewId;
    }

    public UserMetric setViewId(String viewId) {
        this.viewId = viewId;
        return this;
    }

    public Long getRtActiveUsers() {
        return rtActiveUsers;
    }

    public UserMetric setRtActiveUsers(Long rtActiveUsers) {
        this.rtActiveUsers = rtActiveUsers;
        return this;
    }

    public Long getGa7dayUsers() {
        return ga7dayUsers;
    }

    public UserMetric setGa7dayUsers(Long ga7dayUsers) {
        this.ga7dayUsers = ga7dayUsers;
        return this;
    }

    public String getAppVersion() {
        return appVersion;
    }

    public UserMetric setAppVersion(String appVersion) {
        this.appVersion = appVersion;
        return this;
    }

    public Platform getPlatform() {
        return platform;
    }

    public UserMetric setPlatform(Platform platform) {
        this.platform = platform;
        return this;
    }

    public String getName() {
        return name;
    }

    public UserMetric setName(String name) {
        this.name = name;
        return this;
    }

    public String getValue() {
        return value;
    }

    public UserMetric setValue(String value) {
        this.value = value;
        return this;
    }

}
