/*
 * File Name：Systemconfigs.java
 *
 * Copyrighe：copyright@2017 GZSW Company, All Rights Reserved
 *
 * Create Time: 2017年7月11日 上午11:47:11
 */
package com.gdws.vehicle.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 *
 * @author vous (shinena_deng@163.com)
 * @version 1.0, 2017年7月11日 上午11:47:11
 */
@Component
@ConfigurationProperties(prefix = "application")
public class Systemconfigs {
	private String domain;
	private String port;

	/** @return 返回{@link #domain} */
	public String getDomain() {
		return domain;
	}

	/**
	 * @param domain
	 *            设置{@link #domain}
	 */
	public void setDomain(String domain) {
		this.domain = domain;
	}

	/** @return 返回{@link #port} */
	public String getPort() {
		return port;
	}

	/**
	 * @param port
	 *            设置{@link #port}
	 */
	public void setPort(String port) {
		this.port = port;
	}

}
