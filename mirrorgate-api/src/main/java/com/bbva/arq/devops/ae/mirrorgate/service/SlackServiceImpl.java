/*
 * Copyright 2017 Banco Bilbao Vizcaya Argentaria, S.A..
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.bbva.arq.devops.ae.mirrorgate.service;

import com.bbva.arq.devops.ae.mirrorgate.core.dto.SlackDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author enrique
 */
@Service
public class SlackServiceImpl implements SlackService {

    private static final Logger LOG = LoggerFactory.getLogger(SlackServiceImpl.class);

    @Autowired
    RestTemplate restTemplate;

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }

    @Override
    public SlackDTO getToken(String team, String client_id, String client_secret, String code) {
        String url = "https://" + team + ".slack.com/api/oauth.access"
                + "?client_id=" + client_id
                + "&client_secret=" + client_secret
                + "&code=" + code;
        return restTemplate.getForObject(url, SlackDTO.class);
    }

    @Override
    public SlackDTO getWebSocket(String team, String token) {
        String url = "https://" + team
                + ".slack.com/api/rtm.connect?token=" + token;
        return restTemplate.getForObject(url, SlackDTO.class);
    }

}
