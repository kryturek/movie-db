export default function Footer() {
	return (
		<footer>
			<div className="tag">
				<p>Krys Turek</p>
			</div>
			<div className="links">
				<ul>
					<li>
						<a href="https://github.com/kryturek" target="_blank">
							<img src="/github-icon.png" alt="my github page" />
							{/* https://www.flaticon.com/authors/pixel-perfect */}
						</a>
					</li>
					<li>
						<a
							href="https://portfolio-omega-flax.vercel.app/"
							target="_blank"
						>
							<img src="/portfolio-icon.png" alt="my portfolio page" />
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
}
